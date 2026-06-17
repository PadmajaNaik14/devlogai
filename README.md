# DevLog AI 🚀

DevLog AI is an AI-powered developer journaling platform that helps developers document their daily work, track progress, gain insights from analytics, and transform raw journal entries into professional summaries and LinkedIn-ready posts using Generative AI.

## Features

### Authentication & Security

* User Registration and Login
* JWT-based Authentication
* User-specific Journal Access
* Protected API Routes

### Journal Management

* Create Journals
* View Journals
* Update Journals
* Delete Journals
* Persistent Storage using PostgreSQL

### AI-Powered Optimization

* Generate Professional Summaries
* Extract Key Achievements
* Create LinkedIn-Ready Posts
* Powered by Google Gemini AI

### Retrieval-Augmented Generation (RAG)

* Semantic Journal Search using ChromaDB
* Gemini Embeddings for Vector Representation
* Context-Aware AI Responses
* Retrieval of Relevant Past Journal Entries

### Analytics Dashboard

* Journal Activity Tracking
* AI Optimization Statistics
* User Productivity Insights
* Interactive Dashboard Components

### Cloud Deployment

* Frontend deployed on Vercel
* Backend deployed on Render
* Database hosted on Supabase

---

## Tech Stack

### Frontend

* React
* Next.js
* TypeScript
* Tailwind CSS
* Axios

### Backend

* FastAPI
* Python
* SQLAlchemy
* JWT Authentication

### Database

* PostgreSQL (Supabase)

### AI & RAG

* Google Gemini API
* Gemini Embeddings
* ChromaDB
* Retrieval-Augmented Generation (RAG)

### Deployment

* Vercel
* Render

### Version Control

* Git
* GitHub

---

## System Architecture

User → React/Next.js Frontend

↓

FastAPI Backend

↓

PostgreSQL (Supabase)

↓

Gemini AI + ChromaDB

↓

AI Optimization & Context Retrieval

---

## Project Workflow

1. User logs into the platform.
2. User creates and manages development journals.
3. Journal entries are embedded and stored in ChromaDB.
4. When AI Optimization is requested:

   * Relevant past journals are retrieved using semantic search.
   * Retrieved context is combined with the current journal.
   * Gemini generates professional summaries and LinkedIn-ready content.
5. Analytics are updated and displayed on the dashboard.

---

## Environment Variables

### Backend (.env)

```env
DATABASE_URL=
SECRET_KEY=
ALGORITHM=HS256
GEMINI_API_KEY=
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=
```

---

## Installation

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs on:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

## Key Learning Outcomes

* Full-Stack Web Development
* REST API Design
* JWT Authentication
* Database Design and ORM Integration
* Cloud Deployment
* Retrieval-Augmented Generation (RAG)
* Vector Databases
* AI Application Development
* React and Next.js Development
* FastAPI Backend Engineering

---

## Future Enhancements

* User-Specific RAG Filtering
* Journal Tagging and Search
* AI Career Insights
* Team Collaboration Features
* Export Journals to PDF
* Advanced Analytics
* Multi-Model AI Support

---

## Author

Developed as a full-stack AI project to explore modern software engineering, cloud deployment, and Retrieval-Augmented Generation using React, Next.js, FastAPI, PostgreSQL, Gemini AI, and ChromaDB.
