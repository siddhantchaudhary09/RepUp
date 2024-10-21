import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

// Define the interface for the request including user property
export interface Imiddleware extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authMiddleware = async (
  req: Imiddleware, // Request comes first
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.token || req.body.token;

  if (!token) {
    console.log("Token missing");
    res.status(401).json("Token missing");
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as {
      id: string;
      email: string;
    }; // Type assertion for decoded
    console.log("Decoded token:", decoded);
    req.user = decoded; // Attach decoded user information to request
    next();
  } catch (error) {
    console.log("JWT verification error:", error);
    res.status(401).json("Unauthorized request");
    return;
  }
};
