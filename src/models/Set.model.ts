import mongoose, { Document, Schema } from "mongoose";

export interface Iset extends Document {
  _id: string;
  sno?: number;
  weight?: number;
  reps?: number;
}

export const SetSchema: Schema<Iset> = new Schema(
  {
    sno: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    reps: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Set = mongoose.model<Iset>("Set", SetSchema);
