import { Request, Response } from "express";
import Movie from "../../model/movie-schema.model";
import { yearToDate } from "../../helper/year-to-date.helper";
import { MoviesQueryParams } from "../../types/movie.type";
import { BaseController } from "../utils/base.controller";

class MovieController extends BaseController {
  public getMovies = this.handleRequest(async (req: Request, res: Response) => {
    const {
      page = 1,
      limit = 10,
      search,
      genre,
      releaseYear,
      sortBy,
      sortOrder = "asc",
      _id,
    } = req.query as unknown as MoviesQueryParams;

    const query: any = {};

    // Filtering
    if (_id) query._id = _id;
    if (search) query.title = { $regex: search, $options: "i" };
    if (genre) query.genre = genre;
    if (releaseYear) {
      const startDate = yearToDate(releaseYear);
      if (startDate) {
        const endDate = new Date(startDate);
        endDate.setFullYear(endDate.getFullYear() + 1);
        query.release_date = { $gte: startDate, $lt: endDate };
      }
    }

    // Sorting
    const sortOptions: any = {};
    const validSortFields = [
      "release_date",
      "averageRating",
      "ratings",
      "commentsTotal",
    ];
    if (sortBy && validSortFields.includes(sortBy as string)) {
      sortOptions[sortBy as string] = sortOrder === "asc" ? 1 : -1;
    }
    sortOptions._id = 1;

    const movies = await Movie.find(query)
      .sort(sortOptions)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const totalMovies = await Movie.countDocuments(query);

    res.status(200).json({
      movies,
      totalPages: Math.ceil(totalMovies / Number(limit)),
      currentPage: Number(page),
    });
  });
}

export default new MovieController();
