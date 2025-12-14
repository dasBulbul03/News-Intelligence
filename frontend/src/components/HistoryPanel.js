import React from 'react';
import './HistoryPanel.css';

const HistoryPanel = ({ history, onClose, onClear }) => {
  return (
    <div className="history-panel">
      <div className="history-header">
        <h3>Chat History</h3>
        <div className="history-actions">
          <button className="btn-clear" onClick={onClear}>
            🗑️ Clear
          </button>
          <button className="btn-close" onClick={onClose}>
            ✕
          </button>
        </div>
      </div>
      <div className="history-content">
        {history.length === 0 ? (
          <div className="no-history">
            <p>No chat history yet.</p>
            <p>Start a conversation to see history here.</p>
          </div>
        ) : (
          <div className="history-list">
            {history.map((item) => (
              <div key={item.id} className="history-item">
                <div className="history-item-header">
                  <span className="history-time">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                  <span className="history-response-time">
                    {item.response_time}ms
                  </span>
                </div>
                <div className="history-query">
                  <strong>Q:</strong> {item.user_query}
                </div>
                <div className="history-response">
                  <strong>A:</strong> {item.llm_response.substring(0, 100)}
                  {item.llm_response.length > 100 && '...'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;

