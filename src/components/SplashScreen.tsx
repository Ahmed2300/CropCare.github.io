import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => Math.min(prev + 20, 100));
      } else {
        onComplete();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center justify-center z-50">
      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-8">
        <img
          src="https://iili.io/3Axsx8G.png"
          alt="CropCare Logo"
          className="w-16 h-16"
        />
      </div>
      
      <h1 className="text-4xl font-bold text-green-700 mb-8">CropCare</h1>
      
      <div className="w-64 bg-white rounded-full h-2 overflow-hidden">
        <div 
          className="h-full bg-green-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default SplashScreen;