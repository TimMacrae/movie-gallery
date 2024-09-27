import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
  favoriteMovies: string[];
}

export interface IUserFlattened {
  _id: string;
  username: string;
  email: string;
  favoriteMovies?: string[];
}
