import { AdminRepository } from "./repository";

export class AdminService {
  private repository: AdminRepository;

  constructor() {
    this.repository = new AdminRepository();
  }

  async getStats() {
    return this.repository.getStats();
  }

  async getAllUsers() {
    return this.repository.getAllUsers();
  }

  async deleteUser(id: number) {
    return this.repository.deleteUser(id);
  }
}
