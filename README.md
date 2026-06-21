# AI Resume Parser & Scorer

I built this to solve a problem I kept running into while applying for jobs — never knowing how well my resume actually matched a job posting before hitting submit. So instead of manually comparing keywords by eye, I built a tool that does it for me using AI.

Upload a resume (PDF), paste in a job description, and it gives you a match score out of 100, points out what's missing, what's already strong, and three concrete things to fix.

**Live demo:** [resume-scorer-nu.vercel.app](https://resume-scorer-nu.vercel.app)

> Heads up — the backend is hosted on Render's free tier, which spins down after 15 minutes of no traffic. So if nobody's used it in a while, the first request can take 30-50 seconds to wake up before it responds. After that it's fast. Just don't think it's broken if the first try feels slow.

## What it does

- Drag-and-drop PDF upload
- Paste any job description
- AI compares the two and returns a structured breakdown:
  - Overall match score
  - Missing keywords from the JD
  - Existing strengths in the resume
  - 3 specific improvement tips
- Animated, responsive UI — works fine on phone or desktop
- Reset button to analyze another resume without refreshing the page

## Stack

**Frontend:** React (Vite), Tailwind CSS v4, Framer Motion, Lucide icons, Axios

**Backend:** Node.js, Express, Multer for file uploads, pdf-parse for text extraction, Google Gemini API for the actual analysis

## Deployment

- Frontend deployed on [Vercel](https://vercel.com)
- Backend deployed on [Render](https://render.com)

## Running it locally

You'll need Node 18+ and a free Gemini API key from [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) (takes about a minute, just needs a Google login, no card).

Clone it:

\`\`\`
git clone https://github.com/Mohammed-Omer-S/resume-scorer.git
cd resume-scorer
\`\`\`

Backend:

\`\`\`
cd backend
npm install
cp .env.example .env
\`\`\`

Open `.env` and drop your key in:

\`\`\`
PORT=5000
GEMINI_API_KEY=your_key_here
\`\`\`

Then:

\`\`\`
npm run dev
\`\`\`

Frontend, in a separate terminal:

\`\`\`
cd frontend
npm install
\`\`\`

Create a `.env` file inside `frontend` with:

\`\`\`
VITE_API_URL=http://localhost:5000
\`\`\`

Then:

\`\`\`
npm run dev
\`\`\`

Open `http://localhost:5173` and try it.

## How it actually works

1. PDF gets uploaded, backend extracts the raw text with pdf-parse
2. That text + the job description get sent to Gemini with a strict prompt telling it to return only JSON in a specific shape
3. Backend parses that JSON and sends it to the frontend
4. Frontend renders it as score bars, badges, and a tips list

Nothing gets saved anywhere — no database, no accounts. Each analysis is a one-off, which was a deliberate choice to keep this simple and stateless.

## Folder structure

\`\`\`
resume-scorer/
├── backend/
│   ├── server.js
│   ├── routes/analyze.js
│   ├── utils/aiPrompt.js
│   └── .env.example
└── frontend/
    └── src/
        ├── components/
        ├── App.jsx
        └── index.css
\`\`\`

## License

MIT — see [LICENSE](./LICENSE) file.

---

Built by Mohammed Omer. If you spot a bug or have a suggestion, feel free to open an issue.