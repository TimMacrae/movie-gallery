import express, { Request, Response } from "express";
import User from "../../model/user-schema.model";
import { generateToken } from "../../helper/generate-token.helper";
import {
  SignupRequestBody,
  SigninRequestBody,
} from "packages/types/auth/auth.type";
import cookie, { serialize } from "cookie";
import { verify } from "jsonwebtoken";
import Movie from "../../model/movie-schema.model";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    genre,
    releaseYear,
    top10,
    sortBy,
    sortOrder = "asc",
  } = req.query;
  console.log("🚀 => ", req.query);
  try {
    const query: any = {};

    // Filtering
    if (search) query.title = { $regex: search, $options: "i" };
    if (genre) query.genre = genre;
    if (releaseYear) query.releaseYear = releaseYear;
    if (top10) query.averageRating = { $gte: 8 };

    // Sorting
    const sortOptions: any = {};
    if (sortBy) {
      sortOptions[sortBy as string] = sortOrder === "asc" ? 1 : -1;
    }

    const movies = await Movie.find(query)
      .sort(sortOptions)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const totalMovies = await Movie.countDocuments(query);

    res.json({
      movies,
      totalPages: Math.ceil(totalMovies / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
