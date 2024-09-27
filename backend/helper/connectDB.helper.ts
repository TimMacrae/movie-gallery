import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/../.env" });

const dbURI = process.env.MONGODB_URI;

if (!dbURI) {
  console.error("MongoDB URI is not defined in environment variables");
  process.exit(1);
}

// Helper function to connect to MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection error:", error);
    process.exit(1); // Exit process with failure
  }
};
