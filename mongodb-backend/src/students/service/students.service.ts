import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentsRepository } from '../repository/students.repository';
import { Students } from '../entity/students.entity';

@Injectable()
export class StudentsService {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  async createStudent(data: Partial<Students>): Promise<Students> {
    return this.studentsRepository.create(data);
  }

  async getStudents(): Promise<Students[]> {
    return this.studentsRepository.findAll();
  }

  async getStudentById(id: string): Promise<Students> {
    const student = await this.studentsRepository.findById(id);
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async updateStudent(id: string, updateData: Partial<Students>): Promise<Students> {
    const updatedStudent = await this.studentsRepository.update(id, updateData);
    if (!updatedStudent) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return updatedStudent;
  }

  async deleteStudent(id: string): Promise<Students> {
    const deletedStudent = await this.studentsRepository.delete(id);
    if (!deletedStudent) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return deletedStudent;
  }
}
