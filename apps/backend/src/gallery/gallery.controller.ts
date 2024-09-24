import { Request, Response } from "express";
import Movie from "../../model/movie-schema.model";
import { BaseController } from "../utils/base.controller";
import multer from "multer";
import path from "path";
import { v4 } from "uuid";

class GalleryController extends BaseController {
  public getGalleryMovies = this.handleRequest(
    async (req: Request, res: Response) => {
      const { user } = req;
      const movies = await Movie.find({ user_id: user?._id });
      res.status(200).json({ movies: movies });
    }
  );

  public addGalleryMovie = this.handleRequest(
    async (req: Request, res: Response) => {
      const { user } = req;
      const { movie } = req.body;

      if (!movie) {
        res.status(404).json({ message: "Movie not valid" });
        return;
      }

      const newMovie = await Movie.create({
        ...movie,
        user_id: user?._id,
      });
      newMovie.save();

      res.status(201).json(newMovie);
    }
  );

  public updateGalleryMovie = this.handleRequest(
    async (req: Request, res: Response) => {
      const { user } = req;
      const { movie } = req.body;

      if (!movie) {
        res.status(404).json({ message: "Movie not valid" });
        return;
      }
      const updatedMovie = await Movie.findByIdAndUpdate(movie._id, movie, {
        new: true,
      });

      res.status(200).json(updatedMovie);
    }
  );
  public uploadPoster = this.handleRequest(
    async (req: Request, res: Response) => {
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

        res
          .status(200)
          .send({ poster: `/movie-poster/${req?.file?.filename}` });
      });
    }
  );
}

export default new GalleryController();
