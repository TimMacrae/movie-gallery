import express, { Request, Response } from "express";
import { connectDB } from "./helper/connectDB.helper";
import { errorHandlerMiddleware } from "./middleware/error-handler.middleware";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./src/auth/auth.router";
import moviesRoutes from "./src/movies/movies.router";
import CommentsRoutes from "./src/comments/comments.router";
import GalleryRoutes from "./src/gallery/gallery.router";

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
app.use("/gallery", GalleryRoutes);

app.use("/movie-poster", express.static(__dirname + "/public/movie-poster"));
// Error handling middleware
app.use(errorHandlerMiddleware);

export default app;
