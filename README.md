# 🤖 ResumeAI - Intelligent Resume Tailor

An AI-powered web application that analyzes your resume against a specific Job Description, providing a match score, missing keywords, actionable suggestions, and expected interview questions.

## 🚀 Live Demo
- **Frontend:** [https://your-app.vercel.app](#) *(Apna Vercel link yahan dalo)*
- **Backend:** [https://your-api.onrender.com](#) *(Apna Render link yahan dalo)*

## 🛠️ Tech Stack
- **Frontend:** React.js, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL (via Neon.tech) + Prisma ORM
- **AI:** Google Gemini 1.5 Flash API

## ✨ Key Features
- **AI-Powered Analysis:** Generates a structured match score and missing keywords.
- **Strict JSON Prompting:** Custom regex handling to ensure 100% reliable JSON parsing from LLM.
- **Modular Architecture:** Separated AI service (`aiService.ts`) for clean, maintainable code.
- **Production Ready:** Deployed on Vercel (Frontend) and Render (Backend) with proper environment variable management.

## 🏃‍♂️ Local Setup
1. Clone the repository.
2. Setup `.env` in backend with `DATABASE_URL` and `GEMINI_API_KEY`.
3. Run `npm install` and `npx prisma db push` in the backend.
4. Run `npm run dev` in both backend and frontend folders.
