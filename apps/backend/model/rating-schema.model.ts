import mongoose, { Schema } from "mongoose";
import { IRating } from "../types/rating.type";

const ratingSchema: Schema = new Schema(
  {
    movie_id: { type: Schema.Types.ObjectId, required: true, ref: "Movie" },
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    rating: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
  },
  { timestamps: true }
);

// Prevent user from rating a movie more than once
ratingSchema.index({ movie_id: 1, user_id: 1 }, { unique: true });

// Update average rating and total ratings of movie after rating
ratingSchema.post("save", async function (doc: IRating) {
  const Rating = mongoose.model<IRating>("Rating");
  const ratings = await Rating.find({ movie_id: doc.movie_id });
  const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
  const averageRating = totalRating / ratings.length;
  const avarageRatingRounded = Math.round(averageRating * 10) / 10;
  await mongoose.model("Movie").findByIdAndUpdate(doc.movie_id, {
    averageRating: avarageRatingRounded,
    ratings: ratings.length,
  });
});

const Rating = mongoose.model<IRating>("Rating", ratingSchema);

export default Rating;
