import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User, { Gender, Goal, IUser } from "../models/User.model";

interface RegisterUserRequestBody {
  email: string;
  password: string;
  username: string;
  age: number;
  gender: Gender;
  goal: Goal;
}

export const registerUser = async (
  req: Request<{}, {}, RegisterUserRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { email, password, username, age, gender, goal } = req.body;

    if (!email || !password || !username || !age || !gender || !goal) {
      res.status(400).json({ message: "Please fill in all fields" });
      return;
    }

    const presentUser = await User.findOne({ email });
    if (presentUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = new User({
      email,
      password: hashedPassword,
      username,
      age,
      gender,
      goal,
      mobile: "",
      height: "",
      weight: "",
    });

    await newUser.save();

    newUser.password = "";

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error); // For internal debugging
    res.status(500).json({ message: "Internal server error" });
  }
};
interface LoginUserBody {
  email: string;
  password: string;
  username: string;
}
export const loginUser = async (
  req: Request<{}, {}, LoginUserBody>,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "Please fill in all fields" });
      return;
    }
    const LoginUser = await User.findOne({ email });

    if (!LoginUser) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, LoginUser.password);

    LoginUser.password = "";

    if (!isPasswordMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    } else {
      res
        .status(200)
        .json({ message: "User logged in successfully", user: LoginUser });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
