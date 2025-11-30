import express from "express";
import routes from "./routes/index.js";

/**
 * Create and configure Express application
 * @returns {express.Application} - Configured Express app
 */
export function createApp() {
  const app = express();

  // Middleware
  app.use(express.json());

  // Routes
  app.use("/", routes);

  return app;
}
