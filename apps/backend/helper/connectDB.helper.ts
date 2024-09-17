require("dotenv").config({ path: __dirname + "/../.env" });

const mongoose = require("mongoose");
const dbURI = process.env.MONGODB_URI;

// Helper function to connect to MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection error:", error);
    process.exit(1); // Exit process with failure
  }
};
