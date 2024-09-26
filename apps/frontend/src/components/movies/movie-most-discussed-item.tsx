"use client";
import React from "react";
import Image from "next/image";
import { APIROUTES } from "@/api/api-routes.config";
import { useComments } from "@/hooks/useComments.query";
import { Comment } from "../comments/comment.component";
import { Movie } from "../../types/movie.type";

interface MovieMostDiscussedItemProps {
  movie: Movie;
}

export const MovieMostDiscussedItem: React.FC<MovieMostDiscussedItemProps> = ({
  movie,
}) => {
  const { data: comments } = useComments(movie.comments);

  if (!comments) return null;
  return (
    <>
      <div>
        <Image
          src={APIROUTES.API.ENDPOINT + movie.poster}
          alt={movie.title}
          width={300}
          height={450}
          className="rounded-xl object-cover   shadow-lg"
        />
      </div>
      <div className="h-auto overflow-hidden">
        {comments?.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </>
  );
};
