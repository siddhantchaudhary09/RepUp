import mongoose, { Schema } from "mongoose";
import { excerciseCategory, muscleGroup } from "./Excercise.model.ts";

export interface IUserexcercises extends Document {
  _id: string;
  name: string;
  description?: string;
  category: excerciseCategory;
  muscle: muscleGroup;
  Img?: String;
}

export const UserexcercisesSchema: Schema<IUserexcercises> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      enum: Object.values(excerciseCategory),
    },
    muscle: {
      type: String,
      enum: Object.values(muscleGroup),
    },
    Img: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Userexcercises = mongoose.model<IUserexcercises>(
  "Userexcercises",
  UserexcercisesSchema
);
