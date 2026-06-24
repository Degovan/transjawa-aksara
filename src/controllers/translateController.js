import { translateWithKongresAksaraJawa } from "../services/translator.js";

/**
 * Handle single translation request
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export async function translateText(req, res) {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      error: 'Field "text" is required.',
    });
  }

  try {
    const hasil = await translateWithKongresAksaraJawa(text);
    res.json({ result: hasil });
  } catch (err) {
    console.error("Translation error:", err);
    res.status(500).json({
      error: "Translation failed.",
      detail: err.message,
    });
  }
}

/**
 * Handle batch translation request
 * Accepts an array of texts and translates them sequentially.
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export async function translateBatch(req, res) {
  const { texts } = req.body;

  if (!Array.isArray(texts) || texts.length === 0) {
    return res.status(400).json({
      error: 'Field "texts" must be a non-empty array.',
    });
  }

  const results = [];

  for (let i = 0; i < texts.length; i++) {
    const text = texts[i];
    try {
      const hasil = await translateWithKongresAksaraJawa(text);
      results.push(hasil);
    } catch (err) {
      console.error(`Batch translation error at index ${i}:`, err);
      results.push(null);
    }
  }

  res.json(results);
}

/**
 * Handle health check request
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export function healthCheck(req, res) {
  res.json({ status: "ok" });
}
