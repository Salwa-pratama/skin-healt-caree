import { Controller, Get, Delete, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { RoleGuard } from '../../../common/guards/role.guard';

@ApiTags('Admin')
@Controller('feature/admin')
@UseGuards(AuthGuard, new RoleGuard('admin'))
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Mendapatkan statistik admin' })
  async getStats() {
    return { status: "success", message: "Berhasil mengambil statistik admin", data: await this.service.getStats() };
  }

  @Get('users')
  @ApiOperation({ summary: 'Mendapatkan daftar semua user' })
  async getAllUsers() {
    return { status: "success", message: "Berhasil mengambil daftar user", data: await this.service.getAllUsers() };
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Menghapus user' })
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.service.deleteUser(id);
    return { status: "success", message: "Berhasil menghapus user" };
  }
}
