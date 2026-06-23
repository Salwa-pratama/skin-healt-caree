import { Controller, Post, Body, UseGuards, HttpCode, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { SubscribeDto } from './dto/payment.dto';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { User } from '../../../common/decorators/user.decorator';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('subscribe')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: 'Create a new subscription transaction via Midtrans' })
  @ApiResponse({ status: 200, description: 'Midtrans token generated successfully' })
  async subscribe(@User() user: any, @Body() payload: SubscribeDto) {
    return this.paymentService.createSubscription(Number(user.userId), payload);
  }

  @Post('webhook')
  @HttpCode(200)
  @ApiOperation({ summary: 'Midtrans Webhook handler' })
  @ApiResponse({ status: 200, description: 'Webhook processed' })
  async midtransWebhook(@Body() notification: any) {
    // This is called automatically by Midtrans, so NO AuthGuard here.
    return this.paymentService.handleWebhook(notification);
  }

  @Post('verify/:orderId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: 'Verify payment status manually for local dev' })
  @ApiResponse({ status: 200, description: 'Payment verified and status updated' })
  async verifyPayment(@Param('orderId') orderId: string) {
    return this.paymentService.verifyPayment(orderId);
  }
}
