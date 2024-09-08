import React from 'react';
// LandingPage component for the home page

function LandingPage({ onStartDetection }) {
  return (
    <div>
      <h1>Tiredness Detection</h1>
      <button onClick={onStartDetection}>Start Tiredness Detection</button>
    </div>
  );
}

export default LandingPage;