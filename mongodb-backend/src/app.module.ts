import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from './students/module/students.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://chamigunawardane:Mongo123@studentmanagement.15y4a.mongodb.net/studentmanagement?retryWrites=true&w=majority',
    ),
    StudentsModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
