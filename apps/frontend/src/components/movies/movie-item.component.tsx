"use client";
import Image from "next/image";
import { Movie } from "../../types/movie.type";
import React from "react";
import { Star } from "lucide-react";

interface MovieItemProps {
  movie: Movie;
}

export const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  const {
    release_date,
    poster,
    title,
    duration,
    ratings,
    commentsTotal,
    averageRating,
  } = movie;
  const releaseYear = new Date(release_date).getFullYear();

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl shadow-lg">
      <Image src={poster} alt={title} layout="fill" objectFit="cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
        <h1 className="text-white text-xl font-bold">{title}</h1>
        <p className="text-white">{`Release year:  ${releaseYear}`}</p>
        <p className="text-white">{`Duration: ${duration} min.`}</p>

        <p className="text-white flex items-center">
          {`Avarage rating: ${averageRating}`}
          <Star size={15} className="text-yellow-400 ml-1" />
        </p>
        <p className="text-white flex items-center">{`Ratings:${ratings}`}</p>
        <p className="text-white flex items-center">{`Comments: ${commentsTotal}`}</p>
      </div>
    </div>
  );
};
