import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SubscriptionService } from './subscription.service';
import { CreatePlanDto, UpdatePlanDto, SubscribePlanDto } from './dto/subscription.dto';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { User } from '../../../common/decorators/user.decorator';

@ApiTags('Subscription')
@Controller('feature/subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('plans')
  @ApiOperation({ summary: 'Mendapatkan daftar semua plan' })
  async getPlans() {
    return {
      status: "success",
      statusCode: 200,
      data: await this.subscriptionService.getAllPlans(),
      message: "Berhasil mengambil daftar paket"
    };
  }

  @Get('plans/:id')
  @ApiOperation({ summary: 'Detail plan' })
  async getPlanById(@Param('id', ParseIntPipe) id: number) {
    return {
      status: "success",
      statusCode: 200,
      data: await this.subscriptionService.getPlanById(id),
      message: "Berhasil mengambil detail paket"
    };
  }

  @Post('plans')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buat plan baru' })
  async createPlan(@Body() body: CreatePlanDto) {
    return {
      status: "success",
      statusCode: 201,
      data: await this.subscriptionService.createPlan(body),
      message: "Berhasil membuat paket"
    };
  }

  @Put('plans/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update plan' })
  async updatePlan(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePlanDto) {
    return {
      status: "success",
      statusCode: 200,
      data: await this.subscriptionService.updatePlan(id, body),
      message: "Berhasil update paket"
    };
  }

  @Delete('plans/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hapus plan' })
  async deletePlan(@Param('id', ParseIntPipe) id: number) {
    await this.subscriptionService.deletePlan(id);
    return { status: "success", statusCode: 200, message: "Berhasil hapus paket", data: null };
  }

  @Get('my-subscription')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Langganan saya saat ini' })
  async getMySubscription(@User() user: any) {
    return {
      status: "success",
      statusCode: 200,
      data: await this.subscriptionService.getMySubscription(Number(user.userId)),
      message: "Berhasil mengambil langganan aktif"
    };
  }

  @Post('subscribe')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Berlangganan plan' })
  async subscribe(@User() user: any, @Body() body: SubscribePlanDto) {
    const planId = (body as any).planId ?? (body as any).plan_id;
    return {
      status: "success",
      statusCode: 201,
      data: await this.subscriptionService.subscribeToPlan(Number(user.userId), planId!),
      message: "Berlangganan berhasil"
    };
  }
}
