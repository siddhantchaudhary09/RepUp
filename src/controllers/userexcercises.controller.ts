import { Response } from "express";
import { Imiddleware } from "../middlewares/auth.middleware.ts";
import User from "../models/User.model";
import {
  IUserexcercises,
  Userexcercises,
} from "../models/Userexcercises.model";

export const registerExercise = async (
  req: Imiddleware,
  res: Response
): Promise<void> => {
  try {
    const userid = req.user?.id;

    const { name, description, category, muscle } = req.body;

    if (!name || !category || !muscle) {
      res.status(400).json({ message: "Please fill in all fields" });
    }

    const newExercise: IUserexcercises = await Userexcercises.create({
      name,
      description,
      category,
      muscle,
    });

    const updatedUser = await User.findByIdAndUpdate(
      userid,
      { $push: { Userexcercise: newExercise._id } },
      { new: true }
    );

    res
      .status(201)
      .json({ message: "Exercise created", exercise: newExercise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
