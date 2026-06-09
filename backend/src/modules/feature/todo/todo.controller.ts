import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTreatmentDto, UpdateTreatmentDto, CreateHabitDto, UpdateHabitDto } from './dto/todo.dto';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { User } from '../../../common/decorators/user.decorator';

@ApiTags('Todo')
@Controller('feature/todo')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class TodoController {
  constructor(private readonly service: TodoService) {}

  @Get('treatment')
  @ApiOperation({ summary: 'Mendapatkan semua jadwal treatment' })
  async getTreatments(@User() user: any) {
    return { status: "success", message: "Berhasil", data: await this.service.getTreatments(Number(user.userId)) };
  }

  @Get('treatment/:id')
  @ApiOperation({ summary: 'Mendapatkan jadwal treatment by ID' })
  async getTreatmentById(@Param('id') id: string, @User() user: any) {
    return { status: "success", message: "Berhasil", data: await this.service.getTreatmentById(id, Number(user.userId)) };
  }

  @Post('treatment')
  @ApiOperation({ summary: 'Membuat jadwal treatment' })
  async createTreatment(@Body() body: CreateTreatmentDto, @User() user: any) {
    return { status: "success", message: "Berhasil", data: await this.service.createTreatment(Number(user.userId), body) };
  }

  @Put('treatment/:id')
  @ApiOperation({ summary: 'Update jadwal treatment' })
  async updateTreatment(@Param('id') id: string, @Body() body: UpdateTreatmentDto, @User() user: any) {
    return { status: "success", message: "Berhasil", data: await this.service.updateTreatment(id, Number(user.userId), body) };
  }

  @Delete('treatment/:id')
  @ApiOperation({ summary: 'Hapus jadwal treatment' })
  async deleteTreatment(@Param('id') id: string, @User() user: any) {
    await this.service.deleteTreatment(id, Number(user.userId));
    return { status: "success", message: "Berhasil" };
  }

  @Get('habit')
  @ApiOperation({ summary: 'Mendapatkan semua jadwal habit' })
  async getHabits(@User() user: any) {
    return { status: "success", message: "Berhasil", data: await this.service.getHabits(Number(user.userId)) };
  }

  @Get('habit/:id')
  @ApiOperation({ summary: 'Mendapatkan jadwal habit by ID' })
  async getHabitById(@Param('id') id: string, @User() user: any) {
    return { status: "success", message: "Berhasil", data: await this.service.getHabitById(id, Number(user.userId)) };
  }

  @Post('habit')
  @ApiOperation({ summary: 'Membuat jadwal habit' })
  async createHabit(@Body() body: CreateHabitDto, @User() user: any) {
    return { status: "success", message: "Berhasil", data: await this.service.createHabit(Number(user.userId), body) };
  }

  @Put('habit/:id')
  @ApiOperation({ summary: 'Update jadwal habit' })
  async updateHabit(@Param('id') id: string, @Body() body: UpdateHabitDto, @User() user: any) {
    return { status: "success", message: "Berhasil", data: await this.service.updateHabit(id, Number(user.userId), body) };
  }

  @Delete('habit/:id')
  @ApiOperation({ summary: 'Hapus jadwal habit' })
  async deleteHabit(@Param('id') id: string, @User() user: any) {
    await this.service.deleteHabit(id, Number(user.userId));
    return { status: "success", message: "Berhasil" };
  }
}
