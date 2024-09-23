"use client";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/src/components/loading-spinner";
import { Comments } from "@/src/components/comments/comments.component";
import { MovieDetailItem } from "@/src/components/movies/movie-detail-item.component";
import { useMovies } from "@/src/hooks/useMovies.query";
import { Star } from "lucide-react";
import Image from "next/image";
import { APIROUTES } from "@/src/api/api-routes.config";
import { GalleryMoviesDialog } from "@/src/components/gallery/gallery-movie-dialog.component";

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
      <Card className="m-4 p-4 relative">
        <div className="absolute top-4 right-4">
          {<GalleryMoviesDialog type="edit" movie={movie} />}
        </div>
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

            <div className="md:w-auto md:pl-8 pt-8">
              <h1 className="text-4xl font-bold mb-8">{title}</h1>
              <MovieDetailItem
                name={"Release date: "}
                value={`${day}.${month}.${year}`}
              />
              <MovieDetailItem name={"Duration: "} value={`${duration} min.`} />
              <MovieDetailItem
                name={"Avarage rating: "}
                value={`${averageRating} `}
              >
                <Star
                  size={18}
                  className="text-yellow-400 ml-1 inline mt-[-4px]"
                />
              </MovieDetailItem>

              <MovieDetailItem name={"Ratings: "} value={`${ratings}`} />
              <MovieDetailItem name={"Comments: "} value={`${commentsTotal}`} />
              <MovieDetailItem name={"Genre: "} value={`${genre}`} />
              <MovieDetailItem name={"Plot: "} value={`${plot}`} />
            </div>
          </div>
        </div>
      </Card>
      <Comments movieId={_id} commentIds={comments} />
    </>
  );
};

export default MoviePage;
