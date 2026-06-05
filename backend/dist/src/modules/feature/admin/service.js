"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const repository_1 = require("./repository");
class AdminService {
    constructor() {
        this.repository = new repository_1.AdminRepository();
    }
    async getStats() {
        return this.repository.getStats();
    }
    async getAllUsers() {
        return this.repository.getAllUsers();
    }
    async deleteUser(id) {
        return this.repository.deleteUser(id);
    }
}
exports.AdminService = AdminService;
