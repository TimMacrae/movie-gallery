"use client";

import { useRating } from "@/hooks/useRating.query";
import { useUser } from "@/hooks/useUser.query";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import React from "react";
import { useRateMovieMutation } from "./query/use-rate-movie.mutation";

interface MovieRatingProps {
  movie_id: string;
}

export const MovieRating: React.FC<MovieRatingProps> = ({ movie_id }) => {
  const { data: rating } = useRating(movie_id);
  const { data: user } = useUser();
  const { mutate } = useRateMovieMutation();

  const handleRating = (index: number) => {
    mutate({ movie_id, rating: index });
  };

  const renderStars = (rating: number) => {
    const filled = rating;
    const empty = 5 - rating;
    const stars = [];
    for (let index = 0; index < filled; index++) {
      stars.push(
        <StarFilledIcon
          key={index + 1}
          className="text-yellow-400 ml-1 w-5 h-5 hover:cursor-pointer"
          onClick={() => handleRating(index + 1)}
        />
      );
    }
    for (let index = 0; index < empty; index++) {
      stars.push(
        <StarIcon
          key={filled + index + 1}
          className="text-yellow-400 ml-1 w-5 h-5 hover:cursor-pointer"
          onClick={() => handleRating(filled + index + 1)}
        />
      );
    }
    return stars;
  };

  if (!user) return null;
  return (
    <>
      <p className="text-xl font-semibold mb-2 flex items-center">
        {`My Rating: `}
        <span className=" flex ">
          {!rating && renderStars(0)}

          {rating && renderStars(rating.rating)}
        </span>
      </p>
      {!rating && (
        <span className="font-extralight text-xs flex mt-[-10px]">
          No rating, click on a star to rate
        </span>
      )}
    </>
  );
};
