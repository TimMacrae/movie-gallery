"use client";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Comments } from "@/components/comments/comments.component";
import { MovieDetailItem } from "@/components/movies/movie-detail-item.component";
import { useMovies } from "@/hooks/useMovies.query";
import Image from "next/image";
import { APIROUTES } from "@/api/api-routes.config";
import { GalleryMoviesDialog } from "@/components/gallery/gallery-movie-dialog.component";
import { MovieFavorite } from "@/components/movies/movie-favorite.component";
import { MovieRating } from "@/components/movies/movie-rating.component";
import { StarFilledIcon } from "@radix-ui/react-icons";

interface MoviePageProps {
  params: {
    id: string;
  };
}

const MoviePage: React.FC<MoviePageProps> = ({ params }) => {
  const { data, isLoading } = useMovies({
    page: 1,
    limit: 8,
    _id: params.id,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (!data) {
    return <div>Movie not found</div>;
  }

  const movie = data.movies[0];
  const {
    _id,
    title,
    duration,
    ratings,
    commentsTotal,
    averageRating,
    genre,
    plot,
    comments,
  } = movie;
  const year = new Date(movie.release_date).getFullYear();
  const month = new Date(movie.release_date).getMonth();
  const day = new Date(movie.release_date).getDate();

  return (
    <>
      <div className="m-4 mt-12 p-4 relative">
        <GalleryMoviesDialog type="edit" movie={movie} />
        <MovieFavorite movie_id={_id} />
        <div className="container">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-auto">
              <Image
                src={`${APIROUTES.API.ENDPOINT}${movie.poster}`}
                alt={movie.title}
                width={400}
                height={650}
                className="rounded-xl"
              />
            </div>

            <div className="md:w-auto md:pl-8 ">
              <h1>MOVIE DETAILS</h1>
              <h3 className="text-4xl font-bold mb-8">{title}</h3>
              <MovieDetailItem
                name={"Release date: "}
                value={`${day}.${month}.${year}`}
              />
              <MovieDetailItem name={"Duration: "} value={`${duration} min.`} />
              <MovieDetailItem
                name={"Avarage rating: "}
                value={`${averageRating} `}
              >
                <StarFilledIcon className="text-yellow-400 ml-1 w-5 h-5 inline-block mt-[-4px]" />
              </MovieDetailItem>

              <MovieDetailItem name={"Ratings: "} value={`${ratings}`} />
              <MovieRating movie_id={_id} />
              <MovieDetailItem name={"Comments: "} value={`${commentsTotal}`} />
              <MovieDetailItem name={"Genre: "} value={`${genre}`} />
              <MovieDetailItem name={"Plot: "} value={`${plot}`} />
            </div>
          </div>
        </div>
      </div>
      <Comments movieId={_id} commentIds={comments} />
    </>
  );
};

export default MoviePage;
