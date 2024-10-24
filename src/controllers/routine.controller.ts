import { Request, Response } from "express";
import { Imiddleware } from "../middlewares/auth.middleware";
import { Routine } from "../models/Routine.Model";
import User from "../models/User.model";

export const createRoutine = async (
  req: Imiddleware,
  res: Response
): Promise<void> => {
  try {
    const { title } = req.body;
    const userid = req?.user?.id;

    if (!title || !userid) {
      res.status(400).json({ message: "Please fill in all fields" });
      return;
    }

    const newRoutine = await Routine.create({ title });

    if (!newRoutine) {
      res.status(500).json({ message: "Routine not created" });
    }

    const user = await User.findByIdAndUpdate(userid, {
      $push: { routine: newRoutine._id },
    });

    res.status(201).json({
      status: 200,
      message: "Routine created successfully",
      routine: newRoutine,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteroutine = async (
  req: Imiddleware,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userid = req?.user?.id;

    if (!id) {
      res.status(400).json({ message: "Id required" });
      return;
    }

    await User.findByIdAndUpdate(
      userid,
      {
        $pull: { routine: id },
      },
      { new: true }
    );
    const deleteroutine = await Routine.findByIdAndDelete(id);
    if (!deleteroutine) {
      res.status(500).json({ message: "Routine not found" });
    }

    res.status(201).json({
      message: "Routine deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const routineInfo = async (
  req: Request, // Standard order
  res: Response
): Promise<void> => {
  try {
    const { routineId } = req.body;

    const routine = await Routine.findById(routineId).populate({
      path: "excercises",
      populate: {
        path: "Set",
      },
    });

    if (!routine) {
      res.status(404).json({ message: "Routine not found" });
      return;
    }

    res.status(200).json({
      status: 200,
      message: "Routine found",
      routine,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
};
