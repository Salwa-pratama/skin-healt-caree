import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { HistoryRepository } from './history.repository';
import { SubscriptionModule } from '../subscription/subscription.module';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [SubscriptionModule, PrismaModule],
  controllers: [HistoryController],
  providers: [HistoryService, HistoryRepository],
})
export class HistoryModule {}
