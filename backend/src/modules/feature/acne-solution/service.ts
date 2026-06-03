import { AcneSolutionRepository } from "./repository";
import { CreateAcneSolutionDTO, UpdateAcneSolutionDTO } from "./dto";

export class AcneSolutionService {
  private repository: AcneSolutionRepository;

  constructor() {
    this.repository = new AcneSolutionRepository();
  }

  async getAllSolutions() {
    return this.repository.findAll();
  }

  async getSolutionById(id: number) {
    const solution = await this.repository.findById(id);
    if (!solution) {
      throw { status: 404, message: "AcneSolution not found" };
    }
    return solution;
  }

  async createSolution(data: CreateAcneSolutionDTO) {
    return this.repository.create(data);
  }

  async updateSolution(id: number, data: UpdateAcneSolutionDTO) {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw { status: 404, message: "AcneSolution not found" };
    }
    return this.repository.update(id, data);
  }

  async deleteSolution(id: number) {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw { status: 404, message: "AcneSolution not found" };
    }
    return this.repository.delete(id);
  }
}
