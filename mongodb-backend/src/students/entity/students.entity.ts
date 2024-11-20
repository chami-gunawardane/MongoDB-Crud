import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 

@Schema()
export class Students extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  dob: Date;

  @Prop({ required: true })
  contactNo: string;

  @Prop({ required: false })
  image: string;
}

export const StudentsSchema = SchemaFactory.createForClass(Students);
