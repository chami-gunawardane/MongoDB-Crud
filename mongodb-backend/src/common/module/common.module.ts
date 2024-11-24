import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsRepository } from 'src/students/repository/students.repository';

import { CommonService } from '../service/common.service';
import { Students, StudentsSchema } from 'src/students/entity/students.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Students.name, schema: StudentsSchema }]),
  ],
  providers: [CommonService, StudentsRepository],
  exports: [MongooseModule, CommonService],
})
export class CommonModule {}
