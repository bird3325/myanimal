import React, { useState, useRef } from 'react';
import { ArrowLeftIcon, HelpIcon, CameraIcon, GalleryIcon, SwitchCameraIcon, InfoIcon } from './Icons';

interface CapturePageProps {
  onSubmit: () => void;
  error: string | null;
  onBack: () => void;
}

const CapturePage: React.FC<CapturePageProps> = ({ onSubmit, error, onBack }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (agreed) {
      onSubmit();
    } else {
      alert('개인정보 수집 및 이용에 동의해주세요.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 bg-black text-white">
      <header className="py-2 z-10">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
            <button onClick={onBack} className="p-2"><ArrowLeftIcon className="w-6 h-6" /></button>
            <h2 className="text-base sm:text-lg font-bold text-center whitespace-nowrap">사진 촬영</h2>
            <button className="p-2"><HelpIcon className="w-6 h-6" /></button>
        </div>
        <div className="w-full h-1 bg-gray-700 rounded-full mt-2">
            <div className="w-1/4 h-1 bg-[#FF6B9D] rounded-full"></div>
        </div>
      </header>

      <main className="flex-grow flex flex-col justify-center items-center text-center">
        <div className="w-full">
            <p className="text-xl font-bold">📷 정면을 보고 자연스럽게!</p>
            <p className="text-[#74B9FF] mt-1">💡 TIP: 밝은 곳에서 더 정확해요</p>
        </div>

        <div className="w-full aspect-square my-4 rounded-3xl overflow-hidden relative flex justify-center items-center bg-gray-900">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full border-4 border-dashed border-gray-600 rounded-3xl flex flex-col justify-center items-center p-4">
                 <div className="w-48 h-64 border-2 border-white/50 rounded-full opacity-30 relative">
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 flex flex-col items-center">
                        <div className="w-16 h-8 rounded-t-full border-2 border-white/50 border-b-0"></div>
                        <div className="w-8 h-8 rounded-full border-2 border-white/50"></div>
                    </div>
                </div>
                 <p className="mt-2 text-sm text-gray-400">얼굴을 가이드라인 안에 맞춰주세요</p>
            </div>
          )}
        </div>

        {error && <p className="text-red-400 mb-4">{error}</p>}
        
        {imagePreview ? (
            <button onClick={handleSubmit} className="w-full bg-gradient-to-r from-[#FF6B9D] to-[#FF9999] text-white font-bold py-4 rounded-2xl shadow-lg">
                분석 시작하기
            </button>
        ) : (
             <div className="flex items-center justify-around w-full">
                <button onClick={triggerFileUpload} className="p-4">
                    <GalleryIcon className="w-8 h-8 text-gray-300"/>
                </button>
                <button onClick={triggerFileUpload} className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-16 h-16 bg-white rounded-full border-4 border-[#FF6B9D]"></div>
                </button>
                <button className="p-4">
                    <SwitchCameraIcon className="w-8 h-8 text-gray-300"/>
                </button>
             </div>
        )}
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

      </main>

      <footer className="mt-auto text-center text-xs">
         <div className="flex items-center justify-center p-3 rounded-lg bg-gray-800/50">
           <label htmlFor="agree" className="flex items-center cursor-pointer">
             <input type="checkbox" id="agree" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="form-checkbox h-5 w-5 text-[#FF6B9D] bg-gray-700 border-gray-600 rounded focus:ring-[#FF6B9D]"/>
             <span className="ml-2 text-gray-300">개인정보 수집 및 이용 동의</span>
           </label>
           <button className="ml-2 text-gray-400 underline">(자세히 보기)</button>
         </div>
         <p className="mt-2 text-gray-500 flex items-center justify-center">
          <InfoIcon className="w-4 h-4 mr-1"/> 사진은 분석 후 즉시 삭제돼요.</p>
      </footer>
    </div>
  );
};

export default CapturePage;