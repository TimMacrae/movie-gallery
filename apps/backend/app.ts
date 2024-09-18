import express, { Request, Response } from "express";
import { connectDB } from "./helper/connectDB.helper";
import { errorHandlerMiddleware } from "./middleware/error-handler.middleware";
import authRoutes from "./src/auth/auth.router";
import cookieParser from "cookie-parser";
import cors from "cors";

// Create an instance of Express
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

connectDB();

// ROUTES
app.use("/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

// Error handling middleware
app.use(errorHandlerMiddleware);

export default app;
