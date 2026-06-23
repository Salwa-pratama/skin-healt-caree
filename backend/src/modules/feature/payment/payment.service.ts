import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { snap, coreApi } from '../../../utils/midtrans_clients';
import { SubscribeDto } from './dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async createSubscription(userId: number, subscribeDto: SubscribeDto) {
    const { planId, duration } = subscribeDto;

    // 1. Get User and Plan details
    const user = await this.prisma.userPublic.findUnique({
      where: { id: userId },
    });

    const plan = await this.prisma.subscription.findUnique({
      where: { id: planId },
    });

    if (!user) throw new NotFoundException('User not found');
    if (!plan) throw new NotFoundException('Subscription plan not found');

    // 2. Calculate Total Amount and Dates
    // Check if user has an active subscription for discount (potongan harga)
    const activeSub = await this.prisma.userSubscription.findFirst({
      where: { userId, status: 'active' },
      include: { plan: true }
    });
    const activePlanPrice = activeSub?.plan?.price || 0;

    let grossAmount = (plan.price * duration) - activePlanPrice;
    if (grossAmount < 0) grossAmount = 0;
    const startDate = new Date();
    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + duration);

    // If it's a free plan, activate it directly without midtrans
    if (grossAmount === 0) {
      // Deactivate all previous active subscriptions for this user
      await this.prisma.userSubscription.updateMany({
        where: { userId, status: 'active' },
        data: { status: 'inactive' },
      });

      const newSub = await this.prisma.userSubscription.create({
        data: {
          userId,
          planId,
          status: 'active',
          startDate,
          dueDate,
        },
      });
      return { message: 'Free subscription activated', status: 'success', data: newSub };
    }

    // 3. Create a pending subscription in DB first
    const pendingSub = await this.prisma.userSubscription.create({
      data: {
        userId,
        planId,
        status: 'pending',
        startDate,
        dueDate,
      },
    });

    // Generate unique order ID linking to the userSubscription id
    const orderId = `sub-${pendingSub.id}-${Date.now()}`;

    // 4. Create Midtrans Transaction
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      customer_details: {
        first_name: user.name,
        email: user.email,
        phone: user.phone || '',
      },
      item_details: [
        {
          id: `plan-${plan.id}`,
          price: plan.price,
          quantity: duration,
          name: `Berlangganan ${plan.planName} (${duration} Bulan)`,
        },
      ],
    };

    try {
      const transaction = await snap.createTransaction(parameter);
      return {
        message: 'Midtrans transaction created',
        token: transaction.token,
        redirect_url: transaction.redirect_url,
        orderId: orderId,
      };
    } catch (error: any) {
      // If failed to create midtrans, delete the pending sub or mark failed
      await this.prisma.userSubscription.delete({ where: { id: pendingSub.id } });
      throw new InternalServerErrorException(error.message || 'Failed to connect to Midtrans');
    }
  }

  async handleWebhook(notification: any) {
    try {
      // Validate with CoreApi to prevent webhook spoofing
      const statusResponse = await coreApi.transaction.notification(notification);
      const orderId = statusResponse.order_id;
      const transactionStatus = statusResponse.transaction_status;
      const fraudStatus = statusResponse.fraud_status;

      // Extract userSubscriptionId from orderId (format: sub-[id]-[timestamp])
      const match = orderId.match(/^sub-(\d+)-/);
      if (!match) return { message: 'Ignored: not a subscription order' };
      
      const userSubscriptionId = parseInt(match[1], 10);

      const userSub = await this.prisma.userSubscription.findUnique({
        where: { id: userSubscriptionId },
      });

      if (!userSub) throw new NotFoundException('Pending subscription not found');

      // Helper function to activate and deactivate others
      const activateSubscription = async () => {
        await this.prisma.userSubscription.updateMany({
          where: {
            userId: userSub.userId,
            status: 'active',
            id: { not: userSubscriptionId },
          },
          data: { status: 'inactive' },
        });

        await this.prisma.userSubscription.update({
          where: { id: userSubscriptionId },
          data: { status: 'active' },
        });
      };

      // Check transaction status
      if (transactionStatus == 'capture') {
        if (fraudStatus == 'accept') {
          // Success
          await activateSubscription();
        }
      } else if (transactionStatus == 'settlement') {
        // Success
        await activateSubscription();
      } else if (
        transactionStatus == 'cancel' ||
        transactionStatus == 'deny' ||
        transactionStatus == 'expire'
      ) {
        // Failed
        await this.prisma.userSubscription.update({
          where: { id: userSubscriptionId },
          data: { status: 'failed' },
        });
      } else if (transactionStatus == 'pending') {
        // Still pending
      }
      return { message: 'Webhook processed successfully' };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message || 'Webhook failed');
    }
  }

  async verifyPayment(orderId: string) {
    try {
      // Manually request transaction status from Midtrans CoreAPI
      const statusResponse = await coreApi.transaction.status(orderId);
      // Reuse the webhook logic since the payload format is the same
      return await this.handleWebhook(statusResponse);
    } catch (error: any) {
      throw new BadRequestException(error.message || 'Failed to verify payment status');
    }
  }
}
