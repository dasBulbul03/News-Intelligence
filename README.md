# News Intelligence RAG API

A scalable Retrieval-Augmented Generation (RAG) API for news intelligence, built with Node.js, Express, PostgreSQL, Redis, and Qdrant.

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

- **Node.js/Express**: Fast, scalable backend framework
- **PostgreSQL**: Structured data storage for logs
- **Redis**: In-memory storage for session chat history
- **Qdrant**: High-performance vector database for embeddings
- **HuggingFace**: Open-source embeddings model
- **Google Gemini**: Powerful LLM for generation
- **BullMQ**: Reliable job queue for ingestion
- **Docker**: Containerization for easy deployment

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in API keys
3. Run `docker-compose up` to start all services
4. The API will be available at `http://localhost:3000`
5. Swagger docs at `http://localhost:3000/api-docs`

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

Use Docker Compose for production deployment. Ensure environment variables are set correctly.