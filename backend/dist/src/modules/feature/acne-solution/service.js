"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcneSolutionService = void 0;
const repository_1 = require("./repository");
class AcneSolutionService {
    constructor() {
        this.repository = new repository_1.AcneSolutionRepository();
    }
    async getAllSolutions() {
        return this.repository.findAll();
    }
    async getSolutionById(id) {
        const solution = await this.repository.findById(id);
        if (!solution) {
            throw { status: 404, message: "AcneSolution not found" };
        }
        return solution;
    }
    async createSolution(data) {
        return this.repository.create(data);
    }
    async updateSolution(id, data) {
        const existing = await this.repository.findById(id);
        if (!existing) {
            throw { status: 404, message: "AcneSolution not found" };
        }
        return this.repository.update(id, data);
    }
    async deleteSolution(id) {
        const existing = await this.repository.findById(id);
        if (!existing) {
            throw { status: 404, message: "AcneSolution not found" };
        }
        return this.repository.delete(id);
    }
}
exports.AcneSolutionService = AcneSolutionService;
