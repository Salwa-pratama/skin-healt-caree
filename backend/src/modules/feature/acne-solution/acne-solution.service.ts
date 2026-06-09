import { Injectable, NotFoundException } from '@nestjs/common';
import { AcneSolutionRepository } from './acne-solution.repository';
import { CreateAcneSolutionDto, UpdateAcneSolutionDto } from './dto/acne-solution.dto';

@Injectable()
export class AcneSolutionService {
  constructor(private readonly repository: AcneSolutionRepository) {}

  async getAllSolutions() { return this.repository.findAll(); }

  async getSolutionById(id: number) {
    const solution = await this.repository.findById(id);
    if (!solution) throw new NotFoundException("AcneSolution not found");
    return solution;
  }

  async createSolution(data: CreateAcneSolutionDto) {
    return this.repository.create(data);
  }

  async updateSolution(id: number, data: UpdateAcneSolutionDto) {
    const existing = await this.repository.findById(id);
    if (!existing) throw new NotFoundException("AcneSolution not found");
    return this.repository.update(id, data);
  }

  async deleteSolution(id: number) {
    const existing = await this.repository.findById(id);
    if (!existing) throw new NotFoundException("AcneSolution not found");
    return this.repository.delete(id);
  }
}
