import React from 'react';

function LandingPage({ onStartDetection }) {
  return (
    <div>
      <h1>Tiredness Detection</h1>
      <button onClick={onStartDetection}>Start Tiredness Detection</button>
    </div>
  );
}

export default LandingPage;