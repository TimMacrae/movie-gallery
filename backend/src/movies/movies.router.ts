import express from "express";
import MovieController from "./movies.controller";
import { authProtectionMiddleware } from "../../middleware/auth-protection.middleware";

const router = express.Router();

router.get("/", MovieController.getMovies);

router.get(
  "/favorite",
  authProtectionMiddleware,
  MovieController.getFavoriteMovies
);

router.post(
  "/favorite",
  authProtectionMiddleware,
  MovieController.addToFavoriteMovies
);

router.get("/rating", authProtectionMiddleware, MovieController.getMovieRating);

router.post("/rating", authProtectionMiddleware, MovieController.rateMovie);

export default router;
