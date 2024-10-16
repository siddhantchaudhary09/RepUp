import { Response } from "express";
import { Imiddleware } from "../middlewares/auth.middleware.ts";
import { Routine } from "../models/Routine.Model.ts";
import User from "../models/User.model.ts";

export const createRoutine = async (
  req: Imiddleware,
  res: Response
): Promise<void> => {
  try {
    const { title } = req.body;
    const userid = req?.user?.id;

    if (!title) {
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
  }
};
