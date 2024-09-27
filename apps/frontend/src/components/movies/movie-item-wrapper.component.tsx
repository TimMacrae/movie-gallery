import { APIROUTES } from "@/api/api-routes.config";
import { Movie } from "@/types/movie.type";
import Link from "next/link";

interface MovieItemWrapperProps {
  movie: Movie;
  children?: React.ReactNode;
}

export const MovieItemWrapper: React.FC<MovieItemWrapperProps> = ({
  movie,
  children,
}) => {
  return (
    <Link key={movie._id} href={`${APIROUTES.API.GET_MOVIES}/${movie._id}`}>
      <div className="w-[300px] h-[450px]">{children}</div>
    </Link>
  );
};
