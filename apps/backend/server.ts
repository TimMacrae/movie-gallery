import express, { Request, Response } from "express";
import { connectDB } from "./helper/connectDB.helper";
require("dotenv").config({ path: __dirname + "/.env" });

// Create an instance of Express
const app = express();

// Define the port the server will listen on
const PORT = process.env.PORT || 3000;

// Define a basic route
app.get("/", (req: Request, res: Response) => {
  connectDB();
  res.send("Hello, world!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
