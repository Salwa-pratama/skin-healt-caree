import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminRepository } from './admin.repository';

@Injectable()
export class AdminService {
  constructor(private readonly repository: AdminRepository) {}

  async getStats() { return this.repository.getStats(); }
  async getAllUsers() { return this.repository.getAllUsers(); }
  async deleteUser(id: number) {
    try {
      return await this.repository.deleteUser(id);
    } catch (error) {
      throw new NotFoundException("Gagal menghapus user atau user tidak ditemukan");
    }
  }
}
