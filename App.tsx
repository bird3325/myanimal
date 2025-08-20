
import React, { useState, useCallback } from 'react';
import { AppState, AnimalData } from './types';
import HomePage from './components/HomePage';
import CapturePage from './components/CapturePage';
import AnalysisPage from './components/AnalysisPage';
import ResultPage from './components/ResultPage';
import { generateAnimalAnalysis } from './services/geminiService';
import { ANIMAL_LIST } from './constants';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const [analysisResult, setAnalysisResult] = useState<AnimalData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStart = useCallback(() => {
    setAppState(AppState.CAPTURE);
    setError(null);
  }, []);

  const handleRestart = useCallback(() => {
    setAnalysisResult(null);
    setError(null);
    setAppState(AppState.HOME);
  }, []);

  const handlePhotoSubmit = useCallback(async () => {
    setAppState(AppState.ANALYZING);
    setIsLoading(true);
    setError(null);

    try {
      const randomAnimal = ANIMAL_LIST[Math.floor(Math.random() * ANIMAL_LIST.length)];
      const result = await generateAnimalAnalysis(randomAnimal.name);
      
      const completeResult: AnimalData = {
        ...result,
        name: randomAnimal.name,
        name_en: randomAnimal.name_en,
        percentage: (Math.random() * 5 + 10).toFixed(1), // Random percentage like 10-15%
        themeColor: randomAnimal.themeColor,
        themeGradient: randomAnimal.themeGradient,
      };

      setAnalysisResult(completeResult);
      setAppState(AppState.RESULT);
    } catch (e) {
      console.error(e);
      setError('결과를 생성하는 데 실패했습니다. 잠시 후 다시 시도해주세요.');
      setAppState(AppState.CAPTURE); // Go back to capture page on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  const renderContent = () => {
    switch (appState) {
      case AppState.HOME:
        return <HomePage onStart={handleStart} />;
      case AppState.CAPTURE:
        return <CapturePage onSubmit={handlePhotoSubmit} error={error} onBack={() => setAppState(AppState.HOME)} />;
      case AppState.ANALYZING:
        return <AnalysisPage />;
      case AppState.RESULT:
        return analysisResult ? <ResultPage result={analysisResult} onRestart={handleRestart} /> : <HomePage onStart={handleStart} />;
      default:
        return <HomePage onStart={handleStart} />;
    }
  };

  return (
    <div className="bg-white min-h-screen text-[#2D3436]">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
