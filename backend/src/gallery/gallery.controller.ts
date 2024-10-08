import { Request, Response } from "express";
import Movie from "../../model/movie-schema.model";
import { BaseController } from "../utils/base.controller";
import multer from "multer";
import path from "path";
import { v4 } from "uuid";
import { IUser } from "../../types/user.type";
import { IMovie, ResponseMovies } from "../../types/movie.type";
import { ResponseError, ResponseMessage } from "../../types/response.type";

class GalleryController extends BaseController {
  public getGalleryMovies = this.handleRequest(
    async (req: Request<{}, {}, IUser>, res: Response<ResponseMovies>) => {
      const { user } = req;
      const movies = await Movie.find({ user_id: user?._id });
      res.status(200).json({ movies: movies });
    }
  );

  public addGalleryMovie = this.handleRequest(
    async (
      req: Request<{}, {}, { movie: IMovie }>,
      res: Response<ResponseMessage | IMovie>
    ) => {
      const { user } = req;
      const { movie } = req.body;

      if (!movie) {
        return res.status(404).json({ message: "Movie not valid" });
      }

      const newMovie = await Movie.create({
        ...movie,
        user_id: user?._id,
      });
      newMovie.save();

      return res.status(201).json(newMovie);
    }
  );

  public updateGalleryMovie = this.handleRequest(
    async (
      req: Request<{}, {}, { movie: IMovie }>,
      res: Response<ResponseMessage | IMovie | null>
    ) => {
      const { movie } = req.body;

      if (!movie) {
        return res.status(404).json({ message: "Movie not valid" });
      }
      const updatedMovie = await Movie.findByIdAndUpdate(movie._id, movie, {
        new: true,
      });

      return res.status(200).json(updatedMovie);
    }
  );

  public uploadPoster = this.handleRequest(
    async (req: Request, res: Response<{ poster: string } | ResponseError>) => {
      const storage = multer.diskStorage({
        destination: path.join(
          __dirname + "../../../",
          "public",
          "movie-poster"
        ),
        filename: (req, file, cb) => {
          cb(null, v4() + "-" + file.originalname.replace(/\s/g, "-"));
        },
      });

      const upload = multer({ storage }).single("file");

      upload(req, res, (err) => {
        if (err) {
          return res.status(500).send({ error: err.message });
        }

        return res
          .status(200)
          .send({ poster: `/movie-poster/${req?.file?.filename}` });
      });
      return;
    }
  );
}

export default new GalleryController();
