import dotenv from "dotenv";
import { createApp } from "./app.js";
import { initBrowser, closeBrowser } from "./services/translator.js";

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 80;

/**
 * Start the server
 */
export async function startServer() {
  const app = createApp();

  // Initialize browser before accepting requests
  await initBrowser();

  const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

  // Graceful shutdown
  const shutdown = async () => {
    console.log("Shutting down...");
    server.close();
    await closeBrowser();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

// Start server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}
