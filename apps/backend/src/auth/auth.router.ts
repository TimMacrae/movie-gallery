import express, { Request, Response } from "express";
import User from "../user/user-schema.model";
import { generateToken } from "../../helper/generate-token.helper";
import {
  SignupRequestBody,
  SigninRequestBody,
} from "packages/types/auth/auth.type";

const router = express.Router();

// Signup a new user
router.post(
  "/signup",
  async (req: Request<{}, {}, SignupRequestBody>, res: Response) => {
    const { username, email, password } = req.body;
    try {
      const userExists = await User.findOne({ email });
      if (userExists)
        return res.status(400).json({ message: "User already exists" });

      const user = await User.create({ username, email, password });
      const token = generateToken(user._id.toString());

      // Set token in HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res
        .status(201)
        .json({ _id: user._id, username: user.username, email: user.email });
    } catch (err) {
      res.status(500).json({ message: "Signup error" });
    }
  }
);

// Signin user
router.post(
  "/signin",
  async (req: Request<{}, {}, SigninRequestBody>, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || !(await user.matchPassword(password))) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = generateToken(user._id.toString());
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.json({ _id: user._id, username: user.username, email: user.email });
    } catch (err) {
      res.status(500).json({ message: "Signin error" });
    }
  }
);

// Logout user
router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

export default router;
