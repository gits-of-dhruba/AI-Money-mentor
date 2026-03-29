const express = require("express");
const router = express.Router();
const { analyzeWithGroq } = require("../services/groq");

const VALID_FEATURES = ["health", "fire", "life", "tax", "couple", "xray"];

/**
 * POST /api/ai/analyze
 * Body: { feature: string, input: string }
 * Returns: { result: object }
 */
router.post("/analyze", async (req, res) => {
  const { feature, input } = req.body;

  if (!feature || !VALID_FEATURES.includes(feature)) {
    return res.status(400).json({ error: `feature must be one of: ${VALID_FEATURES.join(", ")}` });
  }

  if (!input || typeof input !== "string" || input.trim().length < 10) {
    return res.status(400).json({ error: "input must be a non-empty string (min 10 chars)" });
  }

  if (input.length > 8000) {
    return res.status(400).json({ error: "input too long (max 8000 chars)" });
  }

  try {
    const result = await analyzeWithGroq(feature, input.trim());
    return res.json({ result });
  } catch (err) {
    console.error(`[AI] Error analyzing feature=${feature}:`, err.message);

    if (err instanceof SyntaxError) {
      return res.status(502).json({ error: "AI returned invalid response — please try again." });
    }
    if (err.status === 401) {
      return res.status(500).json({ error: "API key error — contact admin." });
    }
    if (err.status === 429) {
      return res.status(429).json({ error: "AI rate limit hit — please wait a moment and try again." });
    }

    return res.status(500).json({ error: "Analysis failed — please try again." });
  }
});

module.exports = router;
