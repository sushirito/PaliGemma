import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import CameraInterface from './components/CameraInterface';
import ResultDisplay from './components/ResultDisplay';
import { predictTiredness } from './services/api';
import './App.css';

function App() {
  const [showCamera, setShowCamera] = useState(false);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCapture = async (imageFile) => {
    setShowCamera(false);
    setIsLoading(true);
    try {
      const prediction = await predictTiredness(imageFile);
      setResult(prediction);
    } catch (error) {
      console.error('Error predicting tiredness:', error);
      setResult('An error occurred while processing the image.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      {!showCamera && !result && (
        <LandingPage onStartDetection={() => setShowCamera(true)} />
      )}
      {showCamera && (
        <CameraInterface onCapture={handleCapture} />
      )}
      {isLoading && <div>Processing image...</div>}
      {result && <ResultDisplay result={result} />}
    </div>
  );
}

export default App;
