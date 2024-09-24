import { Request, Response } from "express";
import User from "../../model/user-schema.model";
import { generateToken } from "../../helper/generate-token.helper";
import {
  SignupRequestBody,
  SigninRequestBody,
} from "packages/types/auth/auth.type";
import cookie, { serialize } from "cookie";
import { verify } from "jsonwebtoken";
import { BaseController } from "../utils/base.controller";

class AuthController extends BaseController {
  public getUser = this.handleRequest(async (req: Request, res: Response) => {
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.token;

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const decoded = verify(token, process.env.JWT_SECRET as string);
    // @ts-ignore
    const user = await User.findById(decoded?.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      favoritMovies: user.favoritMovies,
    });
  });

  public signup = this.handleRequest(
    async (req: Request<{}, {}, SignupRequestBody>, res: Response) => {
      const { username, email, password } = req.body;

      const userExists = await User.findOne({ email });
      if (userExists) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

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
    }
  );

  public signin = this.handleRequest(
    async (req: Request<{}, {}, SigninRequestBody>, res: Response) => {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user || !(await user.matchPassword(password))) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
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
    }
  );

  public signout = this.handleRequest(async (req: Request, res: Response) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  });
}

export default new AuthController();
