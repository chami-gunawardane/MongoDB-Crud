import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsController } from '../controller/students.controller';
import { StudentsService } from '../service/students.service';
import { StudentsRepository } from '../repository/students.repository';  // Add this import
import { Students, StudentsSchema } from '../entity/students.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Students.name, schema: StudentsSchema }]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService, StudentsRepository],  // Add StudentsRepository here
})
export class StudentsModule {}
