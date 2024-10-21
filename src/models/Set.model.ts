import mongoose, { Document, Schema } from "mongoose";

export interface Iset extends Document {
  _id: string;
  weight: number;
  reps: number;
}

export const SetSchema: Schema<Iset> = new Schema(
  {
    weight: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Set = mongoose.model<Iset>("Set", SetSchema);
