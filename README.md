# Website Examiner

An application that scrapes a website and answers your question.

## Project Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18 or higher
- **Docker Desktop**: v4.5 or higher
- **Gemini API Key**: Free for Gemini 3 Flash model
  - Sign in at [Google AI Studio](https://aistudio.google.com/)

### Installation Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/devesh-kmishra/website-examiner.git
cd website-examiner
```

#### 2. Root Setup

```bash
# Create .env file
copy .env.example .env
```

**Edit `.env`:**

```bash
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=webex_db
```

#### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env
```

**Edit `backend/.env`:**

```bash
PORT=4000
DATABASE_URL=postgres://postgres:postgres@postgres:5432/webex_db
REDIS_HOST=redis
REDIS_PORT=6379
GEMINI_API_KEY=yourfreegeminiapikeyyourfreegeminiapikey
```

#### 4. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

#### 5. Running Locally

**Terminal 1 - Root:**

```bash
docker compose build
docker compose up -d
```

Backend runs on: `http://localhost:4000`

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

Frontend runs on: `http://localhost:3000`
