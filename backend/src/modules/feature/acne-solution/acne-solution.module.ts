import { Module } from '@nestjs/common';
import { AcneSolutionController } from './acne-solution.controller';
import { AcneSolutionService } from './acne-solution.service';
import { AcneSolutionRepository } from './acne-solution.repository';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AcneSolutionController],
  providers: [AcneSolutionService, AcneSolutionRepository],
})
export class AcneSolutionModule {}
