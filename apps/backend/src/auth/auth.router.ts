import express, { Request, Response } from "express";
import User from "../../model/user-schema.model";
import { generateToken } from "../../helper/generate-token.helper";
import {
  SignupRequestBody,
  SigninRequestBody,
} from "packages/types/auth/auth.type";
import cookie, { serialize } from "cookie";
import { verify } from "jsonwebtoken";

const router = express.Router();

router.get("/user", async (req: Request, res: Response) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = verify(token, process.env.JWT_SECRET as string);
    // @ts-ignore
    const user = await User.findById(decoded?.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ _id: user._id, username: user.username, email: user.email });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

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

      res.setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60, // 1 hour
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
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

      res.setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60, // 1 hour
          sameSite: "strict",
          path: "/",
        })
      );

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } catch (err) {
      res.status(500).json({ message: "Signin error" });
    }
  }
);

// Signout user
router.post("/signout", (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

export default router;
