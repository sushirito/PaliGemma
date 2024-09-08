import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

function CameraInterface({ onCapture }) {
  const [countdown, setCountdown] = useState(null);
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Convert base64 to blob
    const base64Data = imageSrc.split(',')[1];
    const blob = b64toBlob(base64Data, 'image/jpeg');
    
    // Create a File object
    const file = new File([blob], `captured_image_${Date.now()}.jpg`, { type: 'image/jpeg' });
    
    // Save the file to src/images/ (this is simulated as we can't directly access the file system)
    console.log('Image saved to src/images/', file.name);
    
    onCapture(file);
  }, [webcamRef, onCapture]);

  // Helper function to convert base64 to blob
  const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  const startCountdown = () => {
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount === 1) {
          clearInterval(timer);
          capture();
          return null;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      {countdown === null ? (
        <button onClick={startCountdown}>Start Countdown</button>
      ) : (
        <div>{countdown}</div>
      )}
    </div>
  );
}

export default CameraInterface;