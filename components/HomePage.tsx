import React, { useState, useEffect } from 'react';
import { AnimalIcon, FireIcon } from './Icons';

interface HomePageProps {
  onStart: () => void;
}

const PopularAnimal: React.FC<{ animal: string; percentage: string; color: string; }> = ({ animal, percentage, color }) => (
  <div className="w-1/2 p-2">
    <div className={`rounded-xl p-4 text-center bg-gray-50 border border-gray-200`}>
      <div className="text-3xl mb-1">{animal.split(' ')[0]}</div>
      <p className={`font-bold text-lg`} style={{ color }}>{animal.split(' ')[1]}</p>
      <p className="text-sm text-gray-500">{percentage}%</p>
    </div>
  </div>
);


const HomePage: React.FC<HomePageProps> = ({ onStart }) => {
  const [userCount, setUserCount] = useState(1234567);
  const animals = ['🐶', '🐱', '🐰', '🦊', '🐼', '🦁', '🐯', '🐻'];
  const [animalIndex, setAnimalIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animalInterval = setInterval(() => {
        setAnimalIndex(prev => (prev + 1) % animals.length);
    }, 1500);
    return () => clearInterval(animalInterval);
  }, [animals.length]);

  return (
    <div className="min-h-screen flex flex-col p-4 bg-white">
      <header className="flex justify-start items-center py-2 mb-8">
        <div className="flex items-center space-x-2">
          <AnimalIcon className="w-7 h-7 sm:w-8 sm:h-8 text-[#FF6B9D]" />
          <h1 className="text-xl sm:text-2xl font-black text-[#2D3436]">MyAnimal</h1>
        </div>
      </header>

      <main className="flex-grow flex flex-col justify-center text-center px-4">
        <div className="mb-8">
          <h2 className="text-5xl font-extrabold leading-tight text-[#2D3436]">
            내 얼굴은<br />
            어떤 <span className="text-[#FF6B9D]">동물상</span>일까?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            ✨ AI가 분석하는 나만의 관상&운세!
          </p>
        </div>

        <div className="relative mb-8 flex justify-center items-center w-64 h-64 mx-auto">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FFF0F5] to-[#E6E6FA] flex items-center justify-center shadow-inner">
            <span
              key={animalIndex}
              className="text-8xl animate-fade-in-scale-up"
              style={{ textShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
            >
              {animals[animalIndex]}
            </span>
          </div>
        </div>

        <button 
          onClick={onStart} 
          className="w-full text-white text-xl font-bold py-4 px-8 rounded-2xl bg-gradient-to-r from-[#FF6B9D] to-[#FF9999]"
        >
          📸 사진 찍고 내 동물상 알아보기
        </button>
      </main>

      <section className="mt-auto">
        <div className="text-center p-4 rounded-2xl bg-gray-50 border border-gray-200 mb-4">
          <p className="text-gray-700">
            📊 지금까지 <span className="font-bold text-[#FF6B9D] text-lg">{userCount.toLocaleString()}</span>명이
          </p>
          <p className="text-gray-700">자신의 동물상을 발견했어요!</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-gray-200">
          <h3 className="text-lg font-bold text-center mb-2 flex items-center justify-center">
            <FireIcon className="w-5 h-5 text-red-500 mr-1" />
            요즘 가장 많이 나오는 동물상
          </h3>
          <div className="flex flex-wrap -m-2">
            <PopularAnimal animal="🐕 골든리트리버" percentage="15.2" color="#F39C12" />
            <PopularAnimal animal="🐱 러시안블루" percentage="12.8" color="#9B59B6" />
            <PopularAnimal animal="🦊 여우상" percentage="11.4" color="#E67E22" />
            <PopularAnimal animal="🐰 토끼상" percentage="9.7" color="#FFB6C1" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;