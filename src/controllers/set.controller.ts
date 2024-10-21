import { Request, Response } from "express";
import { Excercise } from "../models/Excercise.model.ts";
import { Iset, Set } from "../models/Set.model.ts";

export const createSet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { weight, reps, excerciseId } = req.body;

    if (!weight || !reps || !excerciseId) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const Newset: Iset = await Set.create({
      weight,
      reps,
    });

    const excercise = await Excercise.findByIdAndUpdate(
      excerciseId,
      {
        $push: { Set: Newset._id },
      },
      { new: true }
    ).populate("Set");

    res.status(201).json(excercise);
    return;
  } catch (error) {
    res.status(500).json({ message: "Error in creating set" });
    return;
  }
};
