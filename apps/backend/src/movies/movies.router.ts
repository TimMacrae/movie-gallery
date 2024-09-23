import express from "express";
import MovieController from "./movies.controller";
import { authProtectionMiddleware } from "apps/backend/middleware/auth-protection.middleware";

const router = express.Router();

router.get("/", MovieController.getMovies);

export default router;
