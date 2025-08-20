import React, { useState, useEffect } from 'react';
import { ANALYSIS_MESSAGES } from '../constants';

const AnalysisPage: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [centralAnimalIndex, setCentralAnimalIndex] = useState(0);

  const animals = ['🐶', '🐱', '🐰', '🦊', '🐼', '🦁', '🐯', '🐻'];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 80);

    const messageInterval = setInterval(() => {
        setMessageIndex(prev => (prev + 1) % ANALYSIS_MESSAGES.length);
    }, 2000);

    const animalInterval = setInterval(() => {
        setCentralAnimalIndex(prev => (prev + 1) % animals.length);
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearInterval(animalInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col p-4 bg-white">
      <header className="py-2 text-center">
        <h2 className="text-lg font-bold">AI 분석 중...</h2>
        <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
            <div className="w-1/2 h-1 bg-[#FF6B9D] rounded-full"></div>
        </div>
      </header>
      
      <main className="flex-grow flex flex-col justify-center items-center text-center">
        <h3 className="text-2xl font-bold mb-4">
            🔍 AI가 당신의 동물상을<br/>찾고 있어요...
        </h3>

        <div className="relative w-64 h-64 flex items-center justify-center my-8">
            <div className="absolute w-full h-full animate-spin" style={{ animationDuration: '10s' }}>
                {animals.map((animal, i) => (
                    <div 
                        key={i} 
                        className="absolute text-4xl"
                        style={{
                            transform: `rotate(${i * (360 / animals.length)}deg) translateX(100px) rotate(-${i * (360 / animals.length)}deg)`
                        }}
                    >
                        {animal}
                    </div>
                ))}
            </div>
             <div className="w-32 h-32 bg-gradient-to-br from-[#FF6B9D] to-[#FF9999] rounded-full shadow-lg flex items-center justify-center">
               <span
                 key={centralAnimalIndex}
                 className="text-6xl animate-fade-in-scale-up"
               >
                 {animals[centralAnimalIndex]}
               </span>
            </div>
        </div>

        <div className="w-full px-4">
            <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                    className="bg-gradient-to-r from-[#FF6B9D] to-[#FF9999] h-4 rounded-full transition-all duration-500 ease-linear" 
                    style={{width: `${progress}%`}}
                ></div>
            </div>
            <p className="text-lg font-bold mt-2 text-[#FF6B9D]">{progress}%</p>
        </div>
        
        <div className="mt-8 h-16 flex flex-col items-center justify-center text-left w-full px-4">
            <p className="text-gray-600 transition-opacity duration-500">{ANALYSIS_MESSAGES[messageIndex]}</p>
        </div>
      </main>
    </div>
  );
};

export default AnalysisPage;