import { Response } from "express";
import { Imiddleware } from "../middlewares/auth.middleware.ts";
import { Excercise } from "../models/Excercise.model.ts";
import { Routine } from "../models/Routine.Model.ts";
import { Userexcercises } from "../models/Userexcercises.model.ts";

export const createExcercise = async (
  req: Imiddleware,
  res: Response
): Promise<void> => {
  try {
    const { excerciseId, routineId } = req.body;
    const userid = req?.user?.id;
    if (!excerciseId) {
      res.status(400).json({ message: "Please fill in all fields" });
      return;
    }

    const excercise = await Userexcercises.findById(excerciseId);

    const newexcercise = await Excercise.create({
      name: excercise?.name,
      description: excercise?.description,
      category: excercise?.category,
      muscle: excercise?.muscle,
      userid,
    });
    const routineupdate = await Routine.findByIdAndUpdate(
      routineId,
      {
        $push: { excercises: newexcercise._id },
      },
      { new: true }
    ).populate("excercises");

    res.status(201).json(routineupdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteExcercise = async (
  req: Imiddleware,
  res: Response
): Promise<void> => {
  const { excerciseId, routineId } = req.body;
  const userid = req?.user?.id;

  if (!excerciseId) {
    res.status(400).json({ message: "Please fill in all fields" });
    return;
  }

  await Excercise.findByIdAndDelete(excerciseId);

  const routineupdate = await Routine.findByIdAndUpdate(
    routineId,
    {
      $pull: { excercises: excerciseId },
    },
    { new: true }
  ).populate("excercises");

  res.status(201).json(routineupdate);
};
