import { config } from "dotenv";
import app from "./app";

// Define the port the server will listen on
config({ path: __dirname + "/.env" });
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
