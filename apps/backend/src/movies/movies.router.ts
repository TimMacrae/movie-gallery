import express from "express";
import MovieController from "./movies.controller";

const router = express.Router();

router.get("/", MovieController.getMovies);

export default router;
