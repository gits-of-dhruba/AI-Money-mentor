# FinSaathi — AI Money Mentor by ET Money

> **India's first AI-powered personal finance mentor. Free. Instant. Indian.**
> Built for the Economic Times Hackathon.

---

## What is FinSaathi?

FinSaathi democratizes financial planning for every Indian. Financial advisors charge ₹25,000+/year and serve only HNIs (High Net-worth Individuals). FinSaathi gives the same quality guidance in 60 seconds — completely free, no signup required.

---

## Live Demo

Run locally following the setup instructions below.
Open: `http://localhost:5173`

---

## Features

### 6 AI-Powered Financial Tools

| # | Tool | What it does |
|---|------|-------------|
| 1 | ♡ **Money Health Score** | 5-minute financial wellness check across 6 dimensions — emergency fund, insurance, investments, debt, tax efficiency, retirement |
| 2 | ◎ **FIRE Path Planner** | Month-by-month retirement roadmap with SIP breakdown, asset allocation shifts, and FIRE age calculation |
| 3 | ◇ **Life Event Advisor** | Prioritized action plan for bonus, marriage, new baby, inheritance — customized to your tax bracket |
| 4 | ◉ **Tax Wizard** | Old vs new regime comparison, finds every missed deduction ranked by savings and ease |
| 5 | ⬡ **Couple's Money Planner** | India's first AI joint financial planner — optimises HRA claims, NPS, SIP splits across both incomes |
| 6 | ◈ **MF Portfolio X-Ray** | Live NAV via MFAPI.in, XIRR calculation, overlap analysis, expense ratio drag, AI rebalancing plan |

### UI & UX Features

| Feature | Description |
|---------|-------------|
| 🌙 **Dark Mode** | Full dark/light theme toggle — preference saved locally |
| 🌐 **6 Languages** | English, हिंदी, বাংলা, తెలుగు, मराठी, தமிழ் — entire UI translates instantly |
| 📊 **Progress Bar** | Animated step-by-step progress while AI analyses your data |
| 🧮 **Quick Calculators** | SIP, EMI, and FD calculators with live sliders — popup from navbar |
| 📖 **Financial Glossary** | 18 Indian financial terms explained in plain language — searchable |
| 💬 **Share Results** | Share analysis via WhatsApp, Email, or copy to clipboard |
| 🕐 **Recent History** | Last 5 analyses saved locally — view anytime from navbar |
| 🔗 **ET Money Links** | Every recommendation links directly to etmoney.com to take action |

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 + Vite | Fast, component-based UI |
| Backend | Node.js + Express | REST API server |
| AI Model | Groq — Llama 3.3 70B | Free LLM for financial analysis |
| MF Data | MFAPI.in | Live NAV for all Indian mutual funds |
| Security | Helmet + CORS + Rate Limiting | Production-grade protection |
| Styling | Pure CSS-in-JS | No extra dependencies |

---

## Project Structure

```
ai-money-mentor/
│
├── backend/                          # Node.js + Express API server
│   ├── server.js                     # Main server — CORS, security, routes
│   ├── routes/
│   │   ├── ai.js                     # POST /api/ai/analyze — Groq AI calls
│   │   └── mfapi.js                  # GET /api/mf/* — live MF data
│   ├── services/
│   │   ├── groq.js                   # Groq Llama AI service + system prompts
│   │   └── mfapi.js                  # MFAPI.in integration with 30-min cache
│   ├── .env.example                  # Environment variables template
│   └── package.json
│
└── frontend/                         # React + Vite app
    ├── public/
    │   └── index.html                # HTML entry point
    ├── src/
    │   ├── main.jsx                  # React entry point
    │   ├── App.jsx                   # Root — routing, language, dark mode
    │   ├── api/
    │   │   └── client.js             # Axios API client — calls backend
    │   ├── i18n/
    │   │   └── translations.js       # All 6 languages (EN/HI/BN/TE/MR/TA)
    │   ├── components/
    │   │   ├── Navbar.jsx            # Top navigation bar
    │   │   ├── FeatureCard.jsx       # Homepage feature cards
    │   │   ├── Calculator.jsx        # SIP / EMI / FD calculator popup
    │   │   ├── Glossary.jsx          # Financial terms glossary popup
    │   │   ├── DarkMode.jsx          # Dark/light mode toggle + hook
    │   │   ├── LanguageSwitcher.jsx  # 6-language dropdown
    │   │   ├── ProgressBar.jsx       # Animated AI progress indicator
    │   │   ├── ShareResult.jsx       # WhatsApp / Email / Copy sharing
    │   │   ├── RecentHistory.jsx     # Last 5 analyses from localStorage
    │   │   ├── ETMoneyTools.jsx      # ET Money products grid + LinkChip
    │   │   └── ui/index.jsx          # Shared atoms — Card, Tag, ScoreRing...
    │   └── features/
    │       ├── HealthScore/          # Money Health Score feature
    │       ├── FirePlanner/          # FIRE Path Planner feature
    │       ├── LifeEvent/            # Life Event Advisor feature
    │       ├── TaxWizard/            # Tax Wizard feature
    │       ├── CouplesMoney/         # Couple's Money Planner feature
    │       └── MFXray/               # MF Portfolio X-Ray feature
    ├── package.json
    └── vite.config.js                # Vite config + /api proxy to backend
```

---

## Quick Start

### Prerequisites

- **Node.js** v18 or higher — download from [nodejs.org](https://nodejs.org)
- **Groq API Key** — free at [console.groq.com](https://console.groq.com)

### Step 1 — Get Your Free Groq API Key

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up with your Google account
3. Click **API Keys** → **Create API Key**
4. Copy the key (starts with `gsk_...`)

> Groq is 100% free — 14,400 requests/day, no credit card needed.

### Step 2 — Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and add your Groq key:

```env
GROQ_API_KEY=gsk_your_real_key_here
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Start the backend:

```bash
npm run dev
```

You should see:
```
🚀 AI Money Mentor API running on http://localhost:3001
   Groq key: ✓ loaded
   CORS origin: http://localhost:5173
```

### Step 3 — Setup Frontend

Open a **new terminal window**:

```bash
cd frontend
npm install
npm run dev
```

You should see:
```
VITE v5.x ready in 600ms
➜ Local: http://localhost:5173/
```

### Step 4 — Open the App

Go to: **http://localhost:5173**

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | ✅ Yes | Your Groq API key from console.groq.com |
| `PORT` | No | Backend port (default: 3001) |
| `FRONTEND_URL` | No | Frontend URL for CORS (default: http://localhost:5173) |
| `NODE_ENV` | No | development or production |

---

## API Endpoints

### AI Analysis
```
POST /api/ai/analyze
Content-Type: application/json

{
  "feature": "health" | "fire" | "life" | "tax" | "couple" | "xray",
  "input": "User's financial details as plain text"
}
```

### Mutual Fund Data (MFAPI.in)
```
GET  /api/mf/search?q=axis bluechip      # Search funds by name
GET  /api/mf/nav/:schemeCode             # Get latest NAV for a fund
GET  /api/mf/history/:schemeCode?days=365 # Get historical NAV
POST /api/mf/enrich                       # Enrich portfolio with live NAV
```

### Health Check
```
GET /api/health
```

---

## Languages Supported

| Code | Language | Native Script | Speakers |
|------|----------|---------------|---------|
| `en` | English | Latin | Global |
| `hi` | Hindi | हिंदी | 600M+ |
| `bn` | Bengali | বাংলা | 100M+ |
| `te` | Telugu | తెలుగు | 80M+ |
| `mr` | Marathi | मराठी | 80M+ |
| `ta` | Tamil | தமிழ் | 75M+ |

Switch language from the dropdown in the navbar. Preference is saved in `localStorage`.

---

## Running Every Time

You need **two terminal windows** open simultaneously:

**Terminal 1 — Backend**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend**
```bash
cd frontend
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## Common Errors & Fixes

| Error | Fix |
|-------|-----|
| `Port 3001 already in use` | Run `netstat -ano \| findstr :3001` then `taskkill /PID <id> /F` (Windows) |
| `Groq key: ✗ missing` | Open `backend/.env` and add your key, then restart backend |
| `localhost refused to connect` | Make sure both backend AND frontend are running |
| `Analysis failed` | Check backend terminal for error — usually API key issue |
| `vite not recognized` | Run `npm install` in the frontend folder first |
| `Cannot find index.html` | Move `frontend/public/index.html` to `frontend/index.html` |

---

## External APIs Used

| API | Cost | Purpose |
|-----|------|---------|
| [console.groq.com](https://console.groq.com) | Free | AI analysis — Llama 3.3 70B |
| [api.mfapi.in](https://api.mfapi.in) | Free | Live mutual fund NAV data |

---

## Security

- API keys stored in `.env` — never sent to frontend
- Rate limiting: 60 requests per 15 minutes per IP
- Helmet.js security headers on all responses
- CORS restricted to frontend URL only
- Input validation and length limits on all endpoints
- **Zero data storage** — no database, no user data saved anywhere

---

## Uniqueness

1. **India-first AI** — knows 80C, HRA, NPS, ELSS, Indian tax laws natively
2. **Live MF data** — real NAV from MFAPI.in, not static estimates
3. **Couple's joint planning** — first tool to optimize across two Indian incomes
4. **6 languages** — reaches Hindi, Bengali, Telugu, Marathi, Tamil speakers
5. **Advice to action** — every recommendation links to etmoney.com
6. **Zero cost, zero signup** — no barriers for 95% of Indians without a plan

---

## Built With

- [React](https://react.dev) — Frontend framework
- [Vite](https://vitejs.dev) — Build tool
- [Express](https://expressjs.com) — Backend framework
- [Groq SDK](https://console.groq.com) — Free AI API
- [MFAPI.in](https://www.mfapi.in) — Free Indian mutual fund data
- [ET Money](https://www.etmoney.com) — Action links for every recommendation

---

## License

Built for the Economic Times Hackathon. Educational use only.

> ⚠ AI-generated guidance for educational purposes. Consult a SEBI-registered investment advisor before making major financial decisions. Mutual fund investments are subject to market risk.
