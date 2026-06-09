import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { PredictService } from './predict.service';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { User } from '../../../common/decorators/user.decorator';

@ApiTags('Predict')
@Controller('feature/predict')
export class PredictController {
  constructor(private readonly service: PredictService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } }
    }
  })
  @ApiOperation({ summary: 'Menganalisis jenis jerawat dari gambar' })
  @ApiResponse({ status: 200, description: 'Prediksi berhasil' })
  async predict(@UploadedFile() file: Express.Multer.File, @User() user: any) {
    if (!file) {
      throw new BadRequestException("File tidak ditemukan");
    }
    return this.service.predictAsync(Number(user.userId), file.buffer, file.mimetype);
  }
}
