import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to LIBRO</h1>
        <p className="subtitle">당신의 독서 여정을 기록하고, 함께 나누세요</p>
        <div className="features">
          <div className="feature-item">
            <h3>📝 독서 기록</h3>
            <p>읽은 책과 독서 활동을 체계적으로 기록하고 관리하세요</p>
          </div>
          <div className="feature-item">
            <h3>👥 독서 모임</h3>
            <p>관심사가 비슷한 독자들과 함께 독서 모임을 만들어보세요</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
