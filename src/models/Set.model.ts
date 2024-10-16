import mongoose, { Document, Schema } from "mongoose";

export interface Iset extends Document {
  _id: string;
  serial?: number;
  weight: number;
  reps: number;
}

export const SetSchema: Schema<Iset> = new Schema(
  {
    serial: {
      type: Number,
    },
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
