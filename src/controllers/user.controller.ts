import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
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
    const LoginUser = await User.findOne({ email });

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
        sameSite: "strict" | "lax" | "none"; // Specify valid string literals
        httpOnly: boolean;
        secure: boolean;
      } = {
        expires: new Date(Date.now() + 3600 * 1000), // Example expiry date
        sameSite: "lax", // Use one of the allowed values
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
  }
};
