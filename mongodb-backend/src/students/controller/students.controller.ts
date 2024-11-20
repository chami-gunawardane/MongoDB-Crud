import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { StudentsService } from '../service/students.service';
import { Students } from '../entity/students.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async createStudent(@Body() data: Partial<Students>): Promise<Students> {
    return this.studentsService.createStudent(data);
  }

  @Get()
  async getAllStudents(): Promise<Students[]> {
    return this.studentsService.getStudents();
  }

  @Get(':id')
  async getStudentById(@Param('id') id: string): Promise<Students> {
    return this.studentsService.getStudentById(id);
  }

  @Put(':id')
  async updateStudent(
    @Param('id') id: string,
    @Body() updateData: Partial<Students>,
  ): Promise<Students> {
    return this.studentsService.updateStudent(id, updateData);
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id: string): Promise<Students> {
    return this.studentsService.deleteStudent(id);
  }
}
