# News Intelligence RAG API

A scalable Retrieval-Augmented Generation (RAG) API for news intelligence with a modern React frontend, built with Node.js, Express, PostgreSQL, Redis, and Qdrant.

## Architecture

The application follows Clean Architecture principles:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic (ingestion, chat, etc.)
- **Repositories**: Data access layer for databases
- **Routes**: Define API endpoints
- **Middlewares**: Validation, rate limiting, logging
- **Utils**: Helper functions and utilities
- **Jobs**: Background job processing with BullMQ
- **DB**: Database schemas and connections

## RAG Flow Diagram

```
User Query
    |
    v
Generate Embedding (HuggingFace)
    |
    v
Retrieve Top-K Documents (Qdrant)
    |
    v
Build RAG Prompt (Context + History + Query)
    |
    v
Call LLM (Google Gemini)
    |
    v
Return Response + Log to DB
```

## Tech Stack Choices

### Backend
- **Node.js/Express**: Fast, scalable backend framework
- **PostgreSQL**: Structured data storage for logs
- **Redis**: In-memory storage for session chat history
- **Qdrant**: High-performance vector database for embeddings
- **HuggingFace**: Open-source embeddings model
- **Google Gemini**: Powerful LLM for generation
- **BullMQ**: Reliable job queue for ingestion

### Frontend
- **React**: Modern, component-based UI library
- **CSS3**: Beautiful, responsive styling with gradients and animations
- **Nginx**: Production-ready web server for static files

### DevOps
- **Docker**: Containerization for easy deployment
- **Docker Compose**: Multi-container orchestration

## Setup

### Using Docker (Recommended)

1. **Prerequisites:**
   - Docker Desktop installed and running
   - Git installed

2. **Clone the repository:**
   ```bash
   git clone https://github.com/dasBulbul03/News-Intelligence.git
   cd News-Intelligence
   ```

3. **Start all services:**
   ```bash
   docker-compose up -d
   ```

4. **Access the application:**
   - Frontend: `http://localhost:3001` (React app)
   - Backend API: `http://localhost:3000`
   - Health Check: `http://localhost:3000/health`
   - Swagger Docs: `http://localhost:3000/api-docs`

5. **Stop services:**
   ```bash
   docker-compose down
   ```

### Using Node.js (Development)

1. **Prerequisites:**
   - Node.js 20+ installed
   - PostgreSQL, Redis, and Qdrant running (or use Docker for these services)

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   - Create `.env` file with required variables (see `.env.example`)

4. **Start the server:**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

5. **Using startup scripts:**
   - Backend only: Double-click `start-server.bat` or run `.\start-server.ps1`
   - Full stack (Backend + Frontend): Run `.\start-fullstack.ps1`
   - The scripts automatically handle port conflicts and dependency installation

### Running Frontend Separately

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **The frontend will open at:** `http://localhost:3001`

## API Endpoints

### POST /ingest
Ingest news articles into the vector database.

### POST /chat
Chat with the AI using RAG.

Request:
```json
{
  "sessionId": "session1",
  "query": "What is the latest news?"
}
```

### GET /history/:sessionId
Get chat history for a session.

### DELETE /history/:sessionId
Delete chat history for a session.

## Development

- `npm run dev` for development with nodemon
- `npm test` for running tests

## Production Deployment

### Docker Deployment

1. **Build and run:**
   ```bash
   docker-compose up -d --build
   ```

2. **View logs:**
   ```bash
   docker-compose logs -f app
   ```

3. **Stop and remove containers:**
   ```bash
   docker-compose down
   ```

4. **Remove volumes (clean slate):**
   ```bash
   docker-compose down -v
   ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
NODE_ENV=production

# PostgreSQL
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_DB=news_intelligence
POSTGRES_USER=user
POSTGRES_PASSWORD=password

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_URL=redis://redis:6379

# Qdrant
QDRANT_HOST=qdrant
QDRANT_PORT=6333

# API Keys
HUGGINGFACE_API_KEY=your_key_here
GOOGLE_API_KEY=your_key_here
```

## Features

- ✅ Automatic port conflict resolution
- ✅ Health check endpoint
- ✅ Swagger API documentation
- ✅ Docker support with multi-service setup
- ✅ Graceful shutdown handling
- ✅ Comprehensive error handling
- ✅ Production-ready Dockerfile with security best practices