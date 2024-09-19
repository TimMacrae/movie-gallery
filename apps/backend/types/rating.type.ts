import { Document } from "mongoose";

export interface IRating extends Document {
  _id: string;
  movie_id: string;
  user_id: string;
  rating: number;
}
