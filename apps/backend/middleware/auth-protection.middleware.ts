import { verify } from "jsonwebtoken";
import { IUser } from "packages/types/user.type";
import User from "../model/user-schema.model";
import { Request, Response, NextFunction } from "express";

// Extend the Request interface to include the user property
declare module "express-serve-static-core" {
  interface Request {
    user?: IUser | null;
  }
}

export const authProtectionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    // check this method
    // @ts-ignore
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
