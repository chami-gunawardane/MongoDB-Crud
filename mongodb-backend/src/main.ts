import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  mongoose.connect('mongodb+srv://chamigunawardane:Mongo123@studentmanagement.15y4a.mongodb.net/studentmanagement?retryWrites=true&w=majority')
  .then(() => {
    Logger.log('MongoDB connected successfully!', 'DatabaseConnection');
  })
  .catch(err => {
    Logger.error(`MongoDB connection failed: ${err}`, 'DatabaseConnection');
  });


  await app.listen(3001, () => {
    Logger.log('Application is running on: http://localhost:3001', 'Bootstrap');
  });
}
bootstrap();
