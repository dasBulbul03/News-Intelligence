import React from 'react';
import './Header.css';

const Header = ({ sessionId, onIngest, onNewSession, onToggleHistory, showHistory, isLoading }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1>📰 News Intelligence</h1>
          <span className="session-id">Session: {sessionId.substring(0, 20)}...</span>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-secondary" 
            onClick={onIngest}
            disabled={isLoading}
            title="Ingest news articles"
          >
            📥 Ingest News
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={onToggleHistory}
            title="Toggle chat history"
          >
            {showHistory ? '💬 Hide History' : '📜 Show History'}
          </button>
          <button 
            className="btn btn-primary" 
            onClick={onNewSession}
            title="Start new session"
          >
            🆕 New Session
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

