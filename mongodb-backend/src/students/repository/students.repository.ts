import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Students } from '../entity/students.entity';

@Injectable()
export class StudentsRepository {
  constructor(@InjectModel(Students.name) private readonly studentModel: Model<Students>) {}

  async create(student: Partial<Students>): Promise<Students> {
    const newStudent = new this.studentModel(student);
    console.log("Saving student:", student);  
    return newStudent.save();
  }
  

  async findAll(): Promise<Students[]> {
    return this.studentModel.find().exec();
  }

  async findById(id: string): Promise<Students | null> {
    return this.studentModel.findById(id).exec();
  }

  async update(id: string, updateData: Partial<Students>): Promise<Students | null> {
    return this.studentModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<Students | null> {
    return this.studentModel.findByIdAndDelete(id).exec();
  }
}
