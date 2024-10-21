import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { Imiddleware } from "../middlewares/auth.middleware.ts";
import User, { Gender, Goal, IUser } from "../models/User.model";

interface RegisterUserRequestBody {
  email: string;
  password: string;
  username: string;
  age: number;
  gender: Gender;
  goal: Goal;
  height: string;
  weight: string;
  token?: string;
}

export const registerUser = async (
  req: Request<{}, {}, RegisterUserRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { email, password, username, age, gender, goal, height, weight } =
      req.body;

    if (
      !email ||
      !password ||
      !username ||
      !age ||
      !gender ||
      !goal ||
      !height ||
      !weight
    ) {
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
      height,
      weight,
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
    const LoginUser = await User.findOne({ email })
      .populate("Userexcercise")
      .populate("routine");

    if (!LoginUser) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }

    if (await bcrypt.compare(password, LoginUser.password)) {
      const payload = {
        email: LoginUser.email,
        id: LoginUser._id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET as Secret, {
        expiresIn: "2h",
      });
      LoginUser.token = token;
      LoginUser.password = "";

      const options: {
        expires: Date;
        sameSite: "lax" | "none"; // Specify valid string literals
        httpOnly: boolean;
        secure: boolean;
      } = {
        expires: new Date(Date.now() + 3600 * 1000), // Example expiry date
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Use one of the allowed values
        httpOnly: true,
        secure: true,
      };

      res
        .cookie("token", token, options)
        .status(200)
        .json({ user: LoginUser, message: "Logged in successfully" });
      return;
    } else {
      res.status(400).json("Password is incorrect");
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Login failed, try again later");
    return;
  }
};

export const getCurrentUser = async (
  req: Imiddleware,
  res: Response
): Promise<void> => {
  const user = req?.user;

  // Retrieve the user from the database if needed (optional)
  const userdb = await User.findById(user?.id)
    .populate("Userexcercise")
    .populate("routine");

  if (!userdb) {
    res.status(404).json({ status: 404, message: "User not found." });
  }

  res.status(200).json({
    status: 200,
    user: userdb,
    message: "User retrieved successfully.",
  });
};
