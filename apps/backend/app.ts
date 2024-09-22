import express, { Request, Response } from "express";
import { connectDB } from "./helper/connectDB.helper";
import { errorHandlerMiddleware } from "./middleware/error-handler.middleware";
import authRoutes from "./src/auth/auth.router";
import moviesRoutes from "./src/movies/movies.router";
import CommentsRoutes from "./src/comments/comments.router";
import cookieParser from "cookie-parser";
import cors from "cors";

// Create an instance of Express
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  })
);

connectDB();

// ROUTES
app.use("/auth", authRoutes);
app.use("/movies", moviesRoutes);
app.use("/comments", CommentsRoutes);

// Error handling middleware
app.use(errorHandlerMiddleware);

export default app;
