import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, UseInterceptors, UploadedFile, ParseIntPipe, BadRequestException, NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { HistoryService } from './history.service';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { User } from '../../../common/decorators/user.decorator';

@ApiTags('History')
@Controller('feature/history')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class HistoryController {
  constructor(private readonly service: HistoryService) {}

  @Get()
  @ApiOperation({ summary: 'Mendapatkan semua history' })
  async getHistory(@User() user: any) {
    const history = await this.service.getHistoryAsync(Number(user.userId));
    return { kode: 200, status: "success", data: history };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan history berdasarkan ID' })
  async getHistoryById(@Param('id', ParseIntPipe) id: number, @User() user: any) {
    const history = await this.service.getHistoryByIdAsync(Number(user.userId), id);
    if (!history) throw new NotFoundException("History tidak ditemukan");
    return { kode: 200, status: "success", data: history };
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { 
        file: { type: 'string', format: 'binary' },
        jerawat: { type: 'string' },
        predictions: { type: 'string' }
      }
    }
  })
  @ApiOperation({ summary: 'Menyimpan history baru' })
  async saveHistory(@UploadedFile() file: Express.Multer.File, @Body() body: any, @User() user: any) {
    if (!file) throw new BadRequestException("File gambar tidak ditemukan");
    const { jerawat, predictions } = body;
    if (!jerawat || !predictions) throw new BadRequestException("Data prediksi (jerawat & predictions) tidak lengkap");
    
    const saved = await this.service.saveHistoryAsync(file.buffer, Number(user.userId), jerawat, predictions);
    return { kode: 200, status: "success", data: saved };
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { 
        file: { type: 'string', format: 'binary' },
        jerawat: { type: 'string' },
        predictions: { type: 'string' }
      }
    }
  })
  @ApiOperation({ summary: 'Update history' })
  async updateHistory(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File, @Body() body: any, @User() user: any) {
    const { jerawat, predictions } = body;
    if (!jerawat && !predictions && !file) throw new BadRequestException("Tidak ada data yang diupdate");
    
    const updated = await this.service.updateHistoryAsync(id, Number(user.userId), file?.buffer, jerawat, predictions);
    return { kode: 200, status: "success", data: updated };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus history' })
  async deleteHistory(@Param('id', ParseIntPipe) id: number, @User() user: any) {
    await this.service.deleteHistoryAsync(Number(user.userId), id);
    return { kode: 200, status: "success", message: "History deleted" };
  }
}
