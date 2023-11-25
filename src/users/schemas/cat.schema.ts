import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { userInfo } from "os";

// export enum Category {
//   ADVENTURE = 'Adventure',
//   CALSSICS = 'Classics',
//   CRIME = 'Crime',
//   FANTASY = 'Fantasy',
// }

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  tasks: string[];

  // @Prop()
  // category: Category;
}

export const UserSchema = SchemaFactory.createForClass(User);
//export const CatSchema = new mongoose.Schema({
  //   name: String,
  //   age: Number,
  //   breed: String,
  // });