require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const aiRoutes = require("./routes/ai");
const mfapiRoutes = require("./routes/mfapi");

const app = express();
const PORT = process.env.PORT || 3001;

// ── Security & middleware ────────────────────────────────────────────────────
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// ── Rate limiting ─────────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again in 15 minutes." },
});
app.use("/api/", limiter);

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/ai", aiRoutes);
app.use("/api/mf", mfapiRoutes);

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "AI Money Mentor API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ── Error handler ─────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`\n🚀 AI Money Mentor API running on http://localhost:${PORT}`);
  console.log(`   Groq key:      ${process.env.GROQ_API_KEY ? "✓ loaded" : "✗ missing"}`);
  console.log(`   CORS origin:   ${process.env.FRONTEND_URL || "http://localhost:5173"}\n`);
});
