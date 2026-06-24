import express from "express";
import {
  translateText,
  translateBatch,
  healthCheck,
} from "../controllers/translateController.js";

const router = express.Router();

// Translation endpoints
router.post("/translate", translateText);
router.post("/translate/batch", translateBatch);

// Health check endpoint
router.get("/health", healthCheck);

export default router;
