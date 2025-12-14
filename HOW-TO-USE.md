# How to Use the News Intelligence Full Stack Web App

## ✅ Frontend-Backend Connection Status

**YES, the frontend is fully attached to the backend!** Here's how:

1. **API Configuration**: The frontend uses `API_BASE_URL` which defaults to `http://localhost:3000`
2. **Proxy Setup**: In development, React uses a proxy to forward API requests to the backend
3. **CORS Enabled**: The backend has CORS enabled to accept requests from the frontend
4. **All Endpoints Connected**: Chat, History, and Ingest endpoints are all integrated

## 🚀 Quick Start Guide

### Method 1: Using the Full Stack Startup Script (Easiest)

```powershell
.\start-fullstack.ps1
```

This script will:
- ✅ Check if backend is running (start if not)
- ✅ Check if frontend is running (start if not)
- ✅ Open the app in your browser automatically

### Method 2: Manual Start (Two Terminals)

**Terminal 1 - Backend:**
```powershell
npm start
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm start
```

### Method 3: Using Docker

```powershell
docker-compose up -d --build
```

## 📍 Access Points

Once running, access the application at:

- **Frontend (React App)**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/health
- **API Documentation**: http://localhost:3000/api-docs

## 🎯 How to Use the Web App

### 1. **Start the Application**
   - Run `.\start-fullstack.ps1` or start both services manually
   - The frontend will automatically open in your browser at http://localhost:3001

### 2. **Using the Chat Interface**
   - Type your question in the input box at the bottom
   - Press Enter or click the send button (➤)
   - The AI will respond based on the news intelligence data

### 3. **Features Available**

   **📥 Ingest News Button**
   - Click "Ingest News" in the header to start ingesting news articles
   - This populates the vector database with news data

   **📜 Show History Button**
   - Click "Show History" to view all past conversations
   - See your questions and AI responses
   - Click "Clear" to delete all history

   **🆕 New Session Button**
   - Start a fresh conversation session
   - Creates a new session ID

### 4. **Example Queries**
   Try asking:
   - "What are the latest technology news?"
   - "Tell me about recent political developments"
   - "What's happening in the economy?"
   - "Summarize the top news stories"

## 🔧 Troubleshooting

### Frontend Not Connecting to Backend?

1. **Check if backend is running:**
   ```powershell
   curl http://localhost:3000/health
   ```
   Should return: `{"status":"ok","message":"Server is running"}`

2. **Check if frontend is running:**
   ```powershell
   curl http://localhost:3001
   ```
   Should return HTML content

3. **Check browser console:**
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Check Network tab to see API requests

4. **Verify API_BASE_URL:**
   - The frontend uses `http://localhost:3000` by default
   - This is set in `frontend/src/App.js`

### Port Conflicts?

If ports 3000 or 3001 are already in use:
```powershell
# Find process using port 3000
Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess

# Kill the process
Stop-Process -Id <PID> -Force
```

## 📊 API Endpoints Used by Frontend

The frontend makes requests to these backend endpoints:

1. **POST /chat** - Send a message to the AI
   ```json
   {
     "sessionId": "session_123",
     "query": "What is the latest news?"
   }
   ```

2. **GET /history/:sessionId** - Get chat history
   - Returns all previous conversations for the session

3. **DELETE /history/:sessionId** - Clear chat history
   - Removes all history for the current session

4. **POST /ingest** - Start news ingestion
   - Triggers the ingestion process

## 🎨 UI Features

- **Modern Design**: Beautiful gradient UI with smooth animations
- **Responsive**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Messages appear instantly
- **Loading Indicators**: Shows when AI is thinking
- **Error Handling**: Displays friendly error messages
- **Session Management**: Persistent sessions using localStorage

## 🔄 Development vs Production

### Development Mode
- Frontend runs on port 3001 (React dev server)
- Backend runs on port 3000
- Hot reload enabled for both
- Uses proxy for API calls

### Production Mode
- Frontend is built and served by backend
- Single port (3000) for everything
- Optimized static files
- Nginx serves frontend in Docker

## 📝 Next Steps

1. **Start the app**: `.\start-fullstack.ps1`
2. **Open browser**: http://localhost:3001
3. **Try chatting**: Ask questions about news
4. **Ingest news**: Click "Ingest News" to populate data
5. **View history**: Click "Show History" to see past chats

Enjoy using the News Intelligence Full Stack Web App! 🎉

