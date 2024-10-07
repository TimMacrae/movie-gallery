import { Request, Response } from "express";
import User from "../../model/user-schema.model";
import { generateToken } from "../../helper/generate-token.helper";
import { SignupRequestBody, SigninRequestBody } from "../../types/request.type";
import cookie, { serialize } from "cookie";
import { verify } from "jsonwebtoken";
import { BaseController } from "../utils/base.controller";
import { IUserFlattened } from "../../types/user.type";
import { ResponseMessage } from "../../types/response.type";

class AuthController extends BaseController {
  public getUser = this.handleRequest(
    async (req: Request, res: Response<IUserFlattened | ResponseMessage>) => {
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

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        favoriteMovies: user.favoriteMovies,
      });
    }
  );

  public signup = this.handleRequest(
    async (
      req: Request<{}, {}, SignupRequestBody>,
      res: Response<IUserFlattened | ResponseMessage>
    ) => {
      const { username, email, password } = req.body;

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
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
        favoriteMovies: user.favoriteMovies,
      });
    }
  );

  public signin = this.handleRequest(
    async (
      req: Request<{}, {}, SigninRequestBody>,
      res: Response<IUserFlattened | ResponseMessage>
    ) => {
      const { email, password } = req.body;

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
        favoriteMovies: user.favoriteMovies,
      });
    }
  );

  public signout = this.handleRequest(
    async (req: Request, res: Response<ResponseMessage>) => {
      res.clearCookie("token");
      res.json({ message: "Logged out successfully" });
    }
  );
}

export default new AuthController();
