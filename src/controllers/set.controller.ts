import { Request, Response } from "express";
import { Excercise } from "../models/Excercise.model";
import { Iset, Set } from "../models/Set.model";

export const createSet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { excerciseId, sno } = req.body;

    if (!excerciseId || !sno) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const Newset: Iset = await Set.create({
      sno,
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

export const updateSet = async (req: Request, res: Response): Promise<void> => {
  const { weight, reps, setid } = req.body;
  if (!weight || !reps || !setid) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }
  try {
    const set = await Set.findByIdAndUpdate(setid, {
      weight,
      reps,
    });
    res.status(200).json(set);
  } catch (error) {
    res.status(500).json({ message: "Error in updating set" });
    return;
  }
};

export const deleteSet = async (req: Request, res: Response): Promise<void> => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Error in deleting set" });
    return;
  }
};
