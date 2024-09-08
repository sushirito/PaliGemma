import React from 'react';

function ResultDisplay({ result }) {
  return (
    <div>
      <h2>Tiredness Detection Result</h2>
      <textarea readOnly value={result} />
    </div>
  );
}

export default ResultDisplay;