const express = require("express");
const router = express.Router();
const { searchFunds, getLatestNAV, getHistoricalNAV, enrichPortfolio } = require("../services/mfapi");

/**
 * GET /api/mf/search?q=axis bluechip
 * Search funds by name keyword.
 */
router.get("/search", async (req, res) => {
  const { q } = req.query;
  if (!q || q.trim().length < 2) {
    return res.status(400).json({ error: "Query must be at least 2 characters" });
  }
  try {
    const funds = await searchFunds(q.trim());
    return res.json({ funds });
  } catch (err) {
    console.error("[MFAPI] search error:", err.message);
    return res.status(502).json({ error: "Could not fetch fund data from MFAPI" });
  }
});

/**
 * GET /api/mf/nav/:schemeCode
 * Get latest NAV for a scheme.
 */
router.get("/nav/:schemeCode", async (req, res) => {
  const { schemeCode } = req.params;
  if (!/^\d+$/.test(schemeCode)) {
    return res.status(400).json({ error: "schemeCode must be numeric" });
  }
  try {
    const data = await getLatestNAV(schemeCode);
    return res.json(data);
  } catch (err) {
    console.error("[MFAPI] NAV error:", err.message);
    return res.status(502).json({ error: "Could not fetch NAV" });
  }
});

/**
 * GET /api/mf/history/:schemeCode?days=365
 * Get historical NAV for a scheme.
 */
router.get("/history/:schemeCode", async (req, res) => {
  const { schemeCode } = req.params;
  const days = Math.min(parseInt(req.query.days) || 365, 1825); // max 5 years
  if (!/^\d+$/.test(schemeCode)) {
    return res.status(400).json({ error: "schemeCode must be numeric" });
  }
  try {
    const history = await getHistoricalNAV(schemeCode, days);
    return res.json({ schemeCode, days, history });
  } catch (err) {
    console.error("[MFAPI] history error:", err.message);
    return res.status(502).json({ error: "Could not fetch NAV history" });
  }
});

/**
 * POST /api/mf/enrich
 * Body: { holdings: [{ name, schemeCode?, investedAmount, units?, currentValue? }] }
 * Returns holdings enriched with live NAV, current value, returns.
 */
router.post("/enrich", async (req, res) => {
  const { holdings } = req.body;
  if (!Array.isArray(holdings) || holdings.length === 0) {
    return res.status(400).json({ error: "holdings must be a non-empty array" });
  }
  if (holdings.length > 20) {
    return res.status(400).json({ error: "Maximum 20 holdings per request" });
  }
  try {
    const enriched = await enrichPortfolio(holdings);
    const totalCurrent = enriched.reduce((s, h) => s + (h.currentValue || 0), 0);
    const totalInvested = enriched.reduce((s, h) => s + (h.investedAmount || 0), 0);
    const overallReturn = totalInvested > 0
      ? Math.round(((totalCurrent - totalInvested) / totalInvested) * 1000) / 10
      : null;

    return res.json({
      holdings: enriched,
      summary: {
        totalInvested,
        totalCurrentValue: totalCurrent,
        overallAbsoluteReturn: overallReturn !== null ? `${overallReturn}%` : null,
        fetchedAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error("[MFAPI] enrich error:", err.message);
    return res.status(502).json({ error: "Portfolio enrichment failed" });
  }
});

module.exports = router;
