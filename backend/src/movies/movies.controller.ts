import { Request, Response } from "express";
import Movie from "../../model/movie-schema.model";
import Rating from "../../model/rating-schema.model";
import { yearToDate } from "../../helper/year-to-date.helper";
import { BaseController } from "../utils/base.controller";
import { IUser } from "../../types/user.type";
import { IMovie, RequestFavoriteMovie } from "../../types/movie.type";

import {
  RequestMoviesQueryParams,
  MovieQuery,
  SortOptions,
  ResponseMovieFilter,
} from "../../types/movie.type";
import { ResponseError, ResponseMessage } from "../../types/response.type";
import { IRating, RequestRating } from "../../types/rating.type";
class MovieController extends BaseController {
  public getMovies = this.handleRequest(
    async (
      req: Request<{}, {}, RequestMoviesQueryParams>,
      res: Response<ResponseMovieFilter>
    ) => {
      const {
        page = 1,
        limit = 10,
        search,
        genre,
        releaseYear,
        sortBy,
        sortOrder = "asc",
        _id,
      } = req.query;

      const query: MovieQuery = {};

      // Filtering
      if (typeof _id === "string") query._id = _id;
      if (typeof search === "string")
        query.title = { $regex: search, $options: "i" };
      if (typeof genre === "string" && genre !== "") query.genre = genre;
      if (
        releaseYear &&
        (typeof releaseYear === "string" || typeof releaseYear === "number")
      ) {
        const startDate = yearToDate(releaseYear);
        if (startDate) {
          const endDate = new Date(startDate);
          endDate.setFullYear(endDate.getFullYear() + 1);
          query.release_date = { $gte: startDate, $lt: endDate };
        }
      }

      // Sorting
      const sortOptions: SortOptions = {};
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
    }
  );

  public addToFavoriteMovies = this.handleRequest(
    async (
      req: Request<{}, {}, RequestFavoriteMovie>,
      res: Response<ResponseMessage>
    ) => {
      const { movie_id, action } = req.body;
      const user = req.user as IUser;

      const movie = await Movie.findById(movie_id);
      if (!movie) {
        throw new Error("Movie not found");
      }

      if (action === "add" && !user.favoriteMovies.includes(movie_id)) {
        user.favoriteMovies.push(movie_id);
        await user.save();
        return res.status(200).json({ message: action });
      }

      if (action === "remove") {
        user.favoriteMovies = user.favoriteMovies.filter(
          (id) => id.toString() !== movie_id
        );
        await user.save();
        return res.status(200).json({ message: action });
      }
    }
  );

  public getFavoriteMovies = this.handleRequest(
    async (
      req: Request,
      res: Response<{ movies: IMovie[] } | ResponseError>
    ) => {
      const user = req.user as IUser;

      const movies = await Movie.find({
        _id: { $in: user.favoriteMovies },
      });

      res.status(200).json({ movies });
    }
  );

  public getMovieRating = this.handleRequest(
    async (
      req: Request<{}, {}, { movie_id: string }>,
      res: Response<ResponseError | IRating | null>
    ) => {
      const { movie_id } = req.query;
      const movie = await Movie.findById(movie_id);

      if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
      }

      const rating = await Rating.findOne({ movie_id, user_id: req.user?._id });

      res.status(200).json(rating);
    }
  );

  public rateMovie = this.handleRequest(
    async (
      req: Request<{}, {}, RequestRating>,
      res: Response<ResponseError | IRating | ResponseMessage>
    ) => {
      const { movie_id, rating } = req.body;
      const user = req.user as IUser;

      const movie = await Movie.findById(movie_id);
      if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
      }

      const existingRating = await Rating.findOne({
        movie_id,
        user_id: user._id,
      });

      if (existingRating) {
        existingRating.rating = rating;
        await existingRating.save();
      } else {
        await Rating.create({
          movie_id,
          user_id: user._id,
          rating,
        });
      }

      res.status(200).json({ message: "Rating added" });
    }
  );
}

export default new MovieController();
