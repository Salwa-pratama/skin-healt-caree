import { Module } from '@nestjs/common';
import { PredictController } from './predict.controller';
import { PredictService } from './predict.service';
import { PredictRepository } from './predict.repository';
import { SubscriptionModule } from '../subscription/subscription.module';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [SubscriptionModule, PrismaModule],
  controllers: [PredictController],
  providers: [PredictService, PredictRepository],
})
export class PredictModule {}
