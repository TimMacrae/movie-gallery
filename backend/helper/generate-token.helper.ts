import { sign } from "jsonwebtoken";

export const generateToken = (userId: string): string => {
  return sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};
