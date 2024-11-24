import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentsRepository } from '../repository/students.repository';
import { Students } from '../entity/students.entity';
import * as AWS from 'aws-sdk';

@Injectable()
export class StudentsService {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET_NAME;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION, 
  });

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

  async s3_upload(file: any, bucket: string, name: string, mimetype: string) {
    const params = {
      Bucket: bucket,
      Key: `students/${name}`,  
      Body: file,
      ACL: 'public-read',  
      ContentType: mimetype,
      ContentDisposition: 'inline',
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;  
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw new Error('File upload failed');
    }
  }
}
