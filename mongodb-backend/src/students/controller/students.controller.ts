import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { StudentsService } from '../service/students.service';
import { Students } from '../entity/students.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuid } from 'uuid';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createStudent(
    @Body() data: Partial<Students>, 
    @UploadedFile() file: Express.Multer.File
  ): Promise<Students> {
    let imageUrl = null;
    if (file) {
      const fileName = uuid();
      const uploadedFile = await this.studentsService.s3_upload(file.buffer, this.studentsService.AWS_S3_BUCKET, `${fileName}_student`, file.mimetype);
      imageUrl = uploadedFile.Location; 
    }

    return this.studentsService.createStudent({ ...data, image: imageUrl });
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
  @UseInterceptors(FileInterceptor('image'))
  async updateStudent(
    @Param('id') id: string,
    @Body() updateData: Partial<Students>,
    @UploadedFile() file: Express.Multer.File
  ): Promise<Students> {
    let imageUrl = updateData.image;

    if (file) {
      const fileName = uuid();
      const uploadedFile = await this.studentsService.s3_upload(file.buffer, this.studentsService.AWS_S3_BUCKET, `${fileName}_student`, file.mimetype);
      imageUrl = uploadedFile.Location;
    }

    return this.studentsService.updateStudent(id, { ...updateData, image: imageUrl });
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id: string): Promise<Students> {
    return this.studentsService.deleteStudent(id);
  }
}
