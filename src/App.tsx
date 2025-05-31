import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to LIBRO</h1>
        <p className="subtitle">Your Personal Library Management System</p>
        <div className="features">
          <div className="feature-item">
            <h3>📚 Book Management</h3>
            <p>Organize your books with ease</p>
          </div>
          <div className="feature-item">
            <h3>📝 Reading Notes</h3>
            <p>Keep track of your thoughts</p>
          </div>
          <div className="feature-item">
            <h3>📊 Reading Statistics</h3>
            <p>Monitor your reading progress</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
