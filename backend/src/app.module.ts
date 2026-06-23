import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './modules/auth/auth.module';
import { SubscriptionModule } from './modules/feature/subscription/subscription.module';
import { PredictModule } from './modules/feature/predict/predict.module';
import { HistoryModule } from './modules/feature/history/history.module';
import { ProfileModule } from './modules/feature/profile/profile.module';
import { TodoModule } from './modules/feature/todo/todo.module';
import { AcneSolutionModule } from './modules/feature/acne-solution/acne-solution.module';
import { AdminModule } from './modules/feature/admin/admin.module';
import { PaymentModule } from './modules/feature/payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    SupabaseModule,
    AuthModule,
    SubscriptionModule,
    PredictModule,
    HistoryModule,
    ProfileModule,
    TodoModule,
    AcneSolutionModule,
    AdminModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
