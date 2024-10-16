import mongoose, { Document, Schema } from "mongoose";
import { Iset } from "./Set.model.ts";

export enum excerciseCategory {
  beginner = "beginner",
  intermediate = "intermediate",
  advanced = "advanced",
}
export enum muscleGroup {
  chest = "chest",
  back = "back",
  legs = "legs",
  triceps = "triceps",
  biceps = "biceps",
  shoulders = "shoulders",
  abs = "abs",
}

export interface IExcercise extends Document {
  _id: string;
  name: string;
  description?: string;
  category: excerciseCategory;
  muscle: muscleGroup;
  Img?: String;
  Set: Iset[];
  userid: string;
}

const ExcerciseSchema: Schema<IExcercise> = new Schema(
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
    Set: [
      {
        type: Schema.Types.ObjectId,
        ref: "Set",
      },
    ],
    userid: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

export const Excercise = mongoose.model<IExcercise>(
  "Excercise",
  ExcerciseSchema
);
