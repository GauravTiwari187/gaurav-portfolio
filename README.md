# Gaurav Tiwari — Dynamic AI Portfolio (MERN)

A full-stack portfolio website with a landing gate, animated portfolio page,
AI assistant (Gemini API) with text + voice output, certificates/projects
galleries, timeline, contact form, and a JWT-protected admin panel for
managing content.

```
gaurav-portfolio/
├── frontend/     React + Vite + TailwindCSS + Framer Motion
└── backend/      Node.js + Express + MongoDB (Mongoose) + JWT
```

## 1. Prerequisites
- Node.js 18+
- A MongoDB database (local `mongod` or a free MongoDB Atlas cluster)
- A free Gemini API key: https://aistudio.google.com/app/apikey
- (Optional) EmailJS account for the contact form: https://www.emailjs.com

## 2. Backend Setup

```bash
cd backend
cp .env.example .env
# edit .env and fill in MONGO_URI, JWT_SECRET, GEMINI_API_KEY, ADMIN_EMAIL, ADMIN_PASSWORD
npm install
npm run seed     # loads Gaurav's profile, certificates & projects into MongoDB
npm run dev      # starts the API on http://localhost:5000
```

### Backend Environment Variables (`backend/.env`)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/gaurav-portfolio
JWT_SECRET=replace_with_a_long_random_string
GEMINI_API_KEY=your_api_key_here
ADMIN_EMAIL=admin@gauravtiwari.dev
ADMIN_PASSWORD=change_this_password
CLIENT_URL=http://localhost:5173
```

## 3. Frontend Setup

```bash
cd frontend
cp .env.example .env
# edit .env -> VITE_API_URL=http://localhost:5000/api
#              VITE_EMAILJS_SERVICE_ID / TEMPLATE_ID / PUBLIC_KEY (optional)
npm install
npm run dev       # http://localhost:5173
```

## 4. How the AI Assistant Works
The Gemini API key **never** reaches the browser. The React app calls
`POST /api/ai/ask` on the Express backend; the backend attaches Gaurav's
profile/certificates/projects data as context, calls the Gemini API with the
server-side key, and returns the answer. The frontend then:
1. Renders the answer as text (with markdown-lite formatting).
2. Speaks it aloud using the browser's built-in `SpeechSynthesis` (Web Speech
   API) — no extra API/key needed for voice.
3. A "search" bar in the assistant panel routes `skills` / `projects` /
   `certificates` style queries either straight to `/api/search` (fast, no AI
   call) or to the AI for a natural-language answer.

## 5. Admin Panel
Visit `/admin/login`, sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` (seeded on
first run), and you'll get a JWT stored in `localStorage`. The dashboard at
`/admin/dashboard` lets you add/edit/delete certificates and projects, edit
profile fields, and edit the "AI training notes" (extra context fed to
Gemini) — all through the protected `/api/*` routes guarded by
`middleware/auth.js`.

## 6. Deployment

### Frontend → Vercel / Netlify
```bash
cd frontend
npm run build      # outputs dist/
```
- Vercel: import the repo, set root directory to `frontend`, build command
  `npm run build`, output directory `dist`. Add the `VITE_*` env vars in the
  Vercel dashboard.
- Netlify: same idea — build command `npm run build`, publish dir `dist`.

### Backend → Render / Railway / Heroku
- Root directory `backend`, build command `npm install`, start command
  `npm start`.
- Add all variables from `.env.example` in the host's dashboard.
- Update `CLIENT_URL` to your deployed frontend URL (used for CORS).
- After deploy, update the frontend's `VITE_API_URL` to the deployed backend
  URL and redeploy the frontend.

## 7. Tech Stack Summary
- **Frontend:** React 18, Vite, TailwindCSS, Framer Motion, React Router,
  Web Speech API, EmailJS
- **Backend:** Express, Mongoose/MongoDB, JWT + bcrypt auth, Google Gemini
  API (`@google/generative-ai` REST call via fetch)
- **Auth:** JWT bearer tokens, role-based (`admin`) middleware
