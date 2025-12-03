import dotenv from "dotenv";
import { createApp } from "./app.js";

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 3000;

/**
 * Start the server
 */
export function startServer() {
  const app = createApp();

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

// Start server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}
