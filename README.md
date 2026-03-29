# AI Money Mentor — ET Money × Anthropic

India's first AI-powered personal finance mentor. Built for the Economic Times hackathon.

## Project Structure

```
ai-money-mentor/
├── backend/                  # Node.js + Express API server
│   ├── server.js             # Main server entry point
│   ├── routes/
│   │   ├── ai.js             # Anthropic Claude API routes
│   │   └── mfapi.js          # MFAPI.in mutual fund data routes
│   ├── services/
│   │   ├── anthropic.js      # Claude AI service
│   │   └── mfapi.js          # MFAPI integration service
│   ├── .env.example          # Environment variables template
│   └── package.json
│
├── frontend/                 # React app (Vite)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── main.jsx          # React entry point
│   │   ├── App.jsx           # Root app + routing
│   │   ├── api/
│   │   │   └── client.js     # Axios API client
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── FeatureCard.jsx
│   │   │   └── ui/           # Shared UI atoms (Card, Tag, ScoreRing...)
│   │   └── features/
│   │       ├── HealthScore/
│   │       ├── FirePlanner/
│   │       ├── LifeEvent/
│   │       ├── TaxWizard/
│   │       ├── CouplesMoney/
│   │       └── MFXray/       # Portfolio X-Ray with live MFAPI data
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Quick Start

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env
npm run dev
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## Environment Variables

```
ANTHROPIC_API_KEY=sk-ant-...
PORT=3001
FRONTEND_URL=http://localhost:5173
```

## APIs Used

| API | Purpose | Cost |
|-----|---------|------|
| api.anthropic.com | AI analysis (Claude Sonnet) | Paid per token |
| api.mfapi.in | Live MF NAV & fund search | Free, no key needed |

## Features

1. **Money Health Score** — 6-dimension financial wellness score
2. **FIRE Path Planner** — Retirement roadmap with SIP breakdown
3. **Life Event Advisor** — Bonus, marriage, baby financial planning
4. **Tax Wizard** — Old vs new regime + missed deductions
5. **Couple's Money Planner** — Joint financial optimization
6. **MF Portfolio X-Ray** — Live NAV, XIRR, overlap analysis via MFAPI
