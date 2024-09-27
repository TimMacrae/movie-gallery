import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import mongoose, { Error as MongooseError } from "mongoose";
const CastError = mongoose.Error.CastError;

interface CustomError extends Error {
  code?: number;
  value?: string;
  errors?: { [key: string]: { message: string } };
}

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default error values
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Server Error";

  // Handle specific Mongoose errors
  if (err instanceof CastError) {
    statusCode = 400;
    message = `Resource not found with id ${err.value}`;
  }

  // Handle Mongoose duplicate key errors
  if (err.code && err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
  }

  // Handle Mongoose validation errors
  if (err instanceof MongooseError.ValidationError) {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // Send response
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
