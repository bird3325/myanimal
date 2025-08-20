import React from 'react';
import { AnimalData } from '../types';
import { ShareIcon, ArrowLeftIcon, DownloadIcon, ReplayIcon, UserGroupIcon, StarIcon, LeafIcon, HeartIcon, BriefcaseIcon, ShieldIcon } from './Icons';

interface ResultPageProps {
  result: AnimalData;
  onRestart: () => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex">
        {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
        ))}
    </div>
);

const ResultPage: React.FC<ResultPageProps> = ({ result, onRestart }) => {

    const ShareCard = () => (
        <div className={`p-6 rounded-2xl shadow-lg bg-gradient-to-br ${result.themeGradient} text-white text-center`}>
            <p className="font-bold">🐾 MyAnimal</p>
            <p className="mt-4 text-xl">나는</p>
            <h3 className="text-4xl font-black my-2">{result.name}상!</h3>
            <div className="my-6 text-8xl">
                {result.name.includes("강아지") || result.name.includes("리트리버") ? '🐶' : 
                 result.name.includes("고양이") || result.name.includes("블루") ? '🐱' : 
                 result.name.includes("토끼") ? '🐰' : 
                 result.name.includes("여우") ? '🦊' : '🐾'
                }
            </div>
            <p className="text-lg font-semibold bg-black/20 rounded-md px-4 py-2 inline-block">"{result.catchphrase}"</p>
            <p className="mt-6 font-bold text-2xl">너는 무슨 상이야? 🤔</p>
        </div>
    );
    
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="sticky top-0 bg-white/80 backdrop-blur-sm grid grid-cols-[auto_1fr_auto] items-center gap-2 p-4 z-10 border-b">
                <button onClick={onRestart} className="p-2"><ArrowLeftIcon className="w-6 h-6" /></button>
                <h2 className="text-base sm:text-lg font-bold text-center whitespace-nowrap">분석 결과</h2>
                <button className="p-2"><ShareIcon className="w-6 h-6 text-[#FF6B9D]" /></button>
            </header>
            
            <main className="p-4 space-y-6">
                {/* Main Result Card */}
                <section className={`p-6 rounded-2xl shadow-lg text-white text-center bg-gradient-to-br ${result.themeGradient}`}>
                    <p className="text-sm">🎯 분석 결과</p>
                    <h2 className="text-xl mt-2">당신은</h2>
                    <h1 className="text-4xl font-black my-2">{result.name}상</h1>
                    <p className="mb-4">입니다!</p>
                    <div className="text-7xl mb-4">
                        {result.name.includes("강아지") || result.name.includes("리트리버") ? '🐶' : '🐱'}
                    </div>
                    <p className="text-lg font-semibold bg-black/20 rounded-md px-4 py-2 inline-block">⭐ "{result.catchphrase}"</p>
                    <p className="text-sm mt-4 opacity-80">당신과 같은 동물상: {result.percentage}%</p>
                </section>

                {/* Action Buttons */}
                <section className="grid grid-cols-2 gap-4 text-center font-semibold">
                    <button className="w-full bg-[#FF6B9D] text-white py-3 rounded-xl shadow-md flex items-center justify-center space-x-2">
                        <ShareIcon className="w-5 h-5"/>
                        <span>결과 공유하기</span>
                    </button>
                    <button className="w-full bg-white text-gray-700 py-3 rounded-xl shadow-md flex items-center justify-center space-x-2 border">
                        <DownloadIcon className="w-5 h-5"/>
                        <span>결과 저장</span>
                    </button>
                     <button className="w-full bg-white text-gray-700 py-3 rounded-xl shadow-md flex items-center justify-center space-x-2 border">
                        <UserGroupIcon className="w-5 h-5"/>
                        <span>친구 초대</span>
                    </button>
                    <button onClick={onRestart} className="w-full bg-white text-gray-700 py-3 rounded-xl shadow-md flex items-center justify-center space-x-2 border">
                        <ReplayIcon className="w-5 h-5"/>
                        <span>다시 하기</span>
                    </button>
                </section>
                
                {/* AI Face Analysis */}
                <section className="p-6 bg-white rounded-2xl shadow-md">
                    <h3 className="text-xl font-bold mb-4">🔍 AI 관상 분석 결과</h3>
                    <div className="space-y-3 text-gray-700">
                        <p>👁️ <span className="font-semibold">눈매:</span> {result.facial_features.eyes}</p>
                        <p>👃 <span className="font-semibold">코:</span> {result.facial_features.nose}</p>
                        <p>👄 <span className="font-semibold">입술:</span> {result.facial_features.lips}</p>
                        <p>🔸 <span className="font-semibold">얼굴형:</span> {result.facial_features.face_shape}</p>
                    </div>
                </section>
                
                {/* Personality Analysis */}
                <section className="p-6 bg-white rounded-2xl shadow-md">
                    <h3 className="text-xl font-bold mb-4">🎭 {result.name}상의 성격</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-lg text-[#FF6B9D]">✨ 장점</h4>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                                {result.personality.strengths.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-[#FDCB6E]">⚠️ 주의할 점</h4>
                            <p className="mt-2 text-gray-700">{result.personality.weakness}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg text-[#4ECDC4]">💕 연애 스타일</h4>
                            <p className="mt-2 text-gray-700">{result.personality.romance_style}</p>
                        </div>
                    </div>
                </section>

                {/* 2025 Fortune */}
                 <section className="p-6 bg-white rounded-2xl shadow-md">
                    <h3 className="text-xl font-bold mb-4">🔮 {result.name}상의 2025년 운세</h3>
                    <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center"><span className="flex items-center"><LeafIcon className="w-5 h-5 mr-2 text-green-500"/>전체운</span> <StarRating rating={result.fortune_2025.total} /></div>
                        <div className="flex justify-between items-center"><span className="flex items-center"><HeartIcon className="w-5 h-5 mr-2 text-red-500"/>연애운</span> <StarRating rating={result.fortune_2025.romance} /></div>
                        <div className="flex justify-between items-center"><span className="flex items-center"><BriefcaseIcon className="w-5 h-5 mr-2 text-blue-500"/>직업운</span> <StarRating rating={result.fortune_2025.work} /></div>
                        <div className="flex justify-between items-center"><span className="flex items-center"><ShieldIcon className="w-5 h-5 mr-2 text-yellow-500"/>건강운</span> <StarRating rating={result.fortune_2025.health} /></div>
                    </div>
                    <div className="text-center p-4 bg-gray-100 rounded-lg">
                        <p className="font-semibold text-gray-800">🌟 "{result.fortune_2025.summary}"</p>
                    </div>
                     <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-center">
                        <div className="bg-blue-100 p-2 rounded-lg">🍀 행운의 컬러: <span className="font-bold text-blue-800">{result.fortune_2025.lucky_color}</span></div>
                        <div className="bg-purple-100 p-2 rounded-lg">🎁 행운의 아이템: <span className="font-bold text-purple-800">{result.fortune_2025.lucky_item}</span></div>
                    </div>
                </section>

                {/* Compatibility */}
                <section className="p-6 bg-white rounded-2xl shadow-md">
                    <h3 className="text-xl font-bold mb-4">💕 {result.name}상과 찰떡궁합!</h3>
                    <div className="space-y-4">
                        <div className="p-4 rounded-lg border-2 border-[#FF6B9D]">
                            <h4 className="font-bold text-lg">🥇 최고 궁합: <span className="text-[#FF6B9D]">{result.compatibility.best_match}</span></h4>
                            <p className="text-gray-600 mt-1">{result.compatibility.best_match_reason}</p>
                        </div>
                         <div className="p-4 rounded-lg border border-gray-300">
                            <h4 className="font-bold text-lg">🥈 좋은 궁합: <span className="text-gray-700">{result.compatibility.good_match}</span></h4>
                            <p className="text-gray-600 mt-1">{result.compatibility.good_match_reason}</p>
                        </div>
                    </div>
                </section>

                {/* Share Card Preview */}
                <section>
                    <h3 className="text-xl font-bold mb-4 text-center">📤 공유용 이미지 카드</h3>
                    <ShareCard />
                </section>
            </main>
        </div>
    );
};

export default ResultPage;