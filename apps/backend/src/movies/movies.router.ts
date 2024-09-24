import express from "express";
import MovieController from "./movies.controller";
import { authProtectionMiddleware } from "../../middleware/auth-protection.middleware";

const router = express.Router();

router.get("/", MovieController.getMovies);
router.post(
  "/favorite",
  authProtectionMiddleware,
  MovieController.addToFavoriteMovies
);
router.get(
  "/ratings",
  authProtectionMiddleware,
  MovieController.getMovieRatings
);

export default router;
