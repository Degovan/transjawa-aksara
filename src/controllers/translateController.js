import { translateWithKongresAksaraJawa } from "../services/translator.js";

/**
 * Handle translation request
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export async function translateText(req, res) {
  const { indo } = req.body;

  if (!indo) {
    return res.status(400).json({
      error: 'Field "indo" is required.',
    });
  }

  try {
    const hasil = await translateWithKongresAksaraJawa(indo);
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
 * Handle health check request
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export function healthCheck(req, res) {
  res.json({ status: "ok" });
}
