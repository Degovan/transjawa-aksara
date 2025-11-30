import express from "express";
import {
  translateText,
  healthCheck,
} from "../controllers/translateController.js";

const router = express.Router();

// Translation endpoint
router.post("/translate", translateText);

// Health check endpoint
router.get("/health", healthCheck);

export default router;
