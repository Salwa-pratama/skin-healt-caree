import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class SubscribeDto {
  @ApiProperty({ description: 'ID of the subscription plan', example: 2 })
  @IsNumber()
  @IsNotEmpty()
  planId: number;

  @ApiProperty({ description: 'Duration of the subscription in months', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
