import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AcneSolutionService } from './acne-solution.service';
import { CreateAcneSolutionDto, UpdateAcneSolutionDto } from './dto/acne-solution.dto';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { RoleGuard } from '../../../common/guards/role.guard';

@ApiTags('Acne Solution')
@Controller('feature/acne-solution')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class AcneSolutionController {
  constructor(private readonly service: AcneSolutionService) {}

  @Get()
  @ApiOperation({ summary: 'Mendapatkan semua master rekomendasi' })
  async getAllSolutions() {
    return { status: "success", message: "Berhasil", data: await this.service.getAllSolutions() };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan master rekomendasi by ID' })
  async getSolutionById(@Param('id', ParseIntPipe) id: number) {
    return { status: "success", message: "Berhasil", data: await this.service.getSolutionById(id) };
  }

  @Post()
  @UseGuards(new RoleGuard('admin'))
  @ApiOperation({ summary: 'Membuat master rekomendasi (Admin)' })
  async createSolution(@Body() body: CreateAcneSolutionDto) {
    return { status: "success", message: "Berhasil membuat", data: await this.service.createSolution(body) };
  }

  @Put(':id')
  @UseGuards(new RoleGuard('admin'))
  @ApiOperation({ summary: 'Update master rekomendasi (Admin)' })
  async updateSolution(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateAcneSolutionDto) {
    return { status: "success", message: "Berhasil update", data: await this.service.updateSolution(id, body) };
  }

  @Delete(':id')
  @UseGuards(new RoleGuard('admin'))
  @ApiOperation({ summary: 'Hapus master rekomendasi (Admin)' })
  async deleteSolution(@Param('id', ParseIntPipe) id: number) {
    await this.service.deleteSolution(id);
    return { status: "success", message: "Berhasil hapus" };
  }
}
