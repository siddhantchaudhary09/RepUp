import mongoose, { Document, Schema } from "mongoose";
import { IRoutine } from "./Routine.Model.ts";
import { IUserexcercises } from "./Userexcercises.model.ts";

// Define enums for gender and goal
export enum Gender {
  Male = "M",
  Female = "F",
}

export enum Goal {
  FatLoss = "fatloss",
  BodyRecomp = "body recomp",
  MuscleGain = "muscle gain",
}

// User interface
export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  mobile: string;
  gender: Gender; // Use the Gender enum
  age?: number;
  height?: string;
  weight?: string;
  goal: Goal; // Use the Goal enum
  Userexcercise?: IUserexcercises[];
  routine?: IRoutine[];
  token?: string | null;
}

// User schema
const UserSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    mobile: {
      type: String,
    },
    gender: {
      type: String,
      enum: Object.values(Gender), // Use enum values
    },
    height: {
      type: String,
    },
    weight: {
      type: String,
    },
    goal: {
      type: String,
      enum: Object.values(Goal), // Use enum values
    },
    Userexcercise: [
      {
        type: Schema.Types.ObjectId,
        ref: "Userexcercises",
      },
    ],
    routine: [
      {
        type: Schema.Types.ObjectId,
        ref: "Routine",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
