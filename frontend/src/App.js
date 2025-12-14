import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ChatInterface from './components/ChatInterface';
import HistoryPanel from './components/HistoryPanel';
import Header from './components/Header';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function App() {
  const [sessionId, setSessionId] = useState(() => {
    return localStorage.getItem('sessionId') || `session_${Date.now()}`;
  });
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    localStorage.setItem('sessionId', sessionId);
    loadHistory();
  }, [sessionId]);

  const loadHistory = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/history/${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
        // Convert history to messages format
        const historyMessages = data.map(item => ({
          id: item.id,
          text: item.user_query,
          isUser: true,
          timestamp: item.timestamp
        }));
        const responseMessages = data.map(item => ({
          id: `response_${item.id}`,
          text: item.llm_response,
          isUser: false,
          timestamp: item.timestamp
        }));
        // Interleave user and AI messages
        const allMessages = [];
        historyMessages.forEach((userMsg, idx) => {
          allMessages.push(userMsg);
          if (responseMessages[idx]) {
            allMessages.push(responseMessages[idx]);
          }
        });
        setMessages(allMessages);
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const handleSendMessage = async (message) => {
    const userMessage = {
      id: Date.now(),
      text: message,
      isUser: true,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId,
          query: message
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage = {
          id: Date.now() + 1,
          text: data.response,
          isUser: false,
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, aiMessage]);
        loadHistory(); // Reload history to get updated list
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: `Error: ${error.message}`,
        isUser: false,
        isError: true,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIngest = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/ingest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        alert('News ingestion started successfully!');
      } else {
        throw new Error('Failed to start ingestion');
      }
    } catch (error) {
      console.error('Error ingesting news:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (window.confirm('Are you sure you want to clear all chat history?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/history/${sessionId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setMessages([]);
          setHistory([]);
        }
      } catch (error) {
        console.error('Error clearing history:', error);
      }
    }
  };

  const handleNewSession = () => {
    const newSessionId = `session_${Date.now()}`;
    setSessionId(newSessionId);
    setMessages([]);
    setHistory([]);
  };

  return (
    <div className="App">
      <Header 
        sessionId={sessionId}
        onIngest={handleIngest}
        onNewSession={handleNewSession}
        onToggleHistory={() => setShowHistory(!showHistory)}
        showHistory={showHistory}
        isLoading={isLoading}
      />
      <div className="app-container">
        {showHistory && (
          <HistoryPanel 
            history={history}
            onClose={() => setShowHistory(false)}
            onClear={handleClearHistory}
          />
        )}
        <ChatInterface
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default App;
