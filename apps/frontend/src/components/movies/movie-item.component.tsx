"use client";
import Image from "next/image";
import { Movie } from "../../types/movie.type";
import React from "react";
import { Star } from "lucide-react";

interface MovieItemProps {
  movie: Movie;
}

export const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  const { release_date, poster, title, genre, averageRating } = movie;
  const releaseYear = new Date(release_date).getFullYear();

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg">
      <Image src={poster} alt={title} layout="fill" objectFit="cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
        <h1 className="text-white text-xl font-bold">{title}</h1>
        <p className="text-white">{genre}</p>
        <p className="text-white">{releaseYear}</p>
        <p className="text-white flex items-center">
          {averageRating}
          <Star size={15} style={{ marginLeft: 4, marginTop: -2 }} />
        </p>
      </div>
    </div>
  );
};
