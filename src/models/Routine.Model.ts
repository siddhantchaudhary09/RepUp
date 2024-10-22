import mongoose, { Schema } from "mongoose";
import { IExcercise } from "./Excercise.model";

export interface IRoutine extends Document {
  _id: string;
  title: string;
  excercises: IExcercise[];
}

export const RoutineSchema: Schema<IRoutine> = new Schema({
  title: {
    type: String,
    required: true,
  },
  excercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Excercise",
    },
  ],
});

export const Routine = mongoose.model<IRoutine>("Routine", RoutineSchema);
