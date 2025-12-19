
import React, { useState, useEffect } from 'react';

interface StartupProps {
  onComplete: () => void;
}

export default function Startup({ onComplete }: StartupProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 4000; // 4 seconds boot time
    const interval = 50;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500); // Small delay after 100%
          return 100;
        }
        return Math.min(oldProgress + step, 100);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const wallpaper = "https://images.unsplash.com/photo-1506318137071-a8e063b4bcc0?q=80&w=1920&auto=format&fit=crop";

  return (
    <div 
      className="fixed inset-0 z-[300] bg-cover bg-center flex flex-col items-center justify-center transition-opacity duration-1000"
      style={{ backgroundImage: `url('${wallpaper}')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>

      {/* Microsoft Logo Top Right */}
      <div className="absolute top-8 right-12 flex items-center gap-2 opacity-80">
        <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
          <div className="bg-[#f25022]"></div><div className="bg-[#7fba00]"></div>
          <div className="bg-[#00a4ef]"></div><div className="bg-[#ffb900]"></div>
        </div>
        <span className="text-gray-800 font-bold text-sm">Microsoft</span>
      </div>

      {/* Main Branding */}
      <div className="relative flex flex-col items-center animate-window">
        <div className="flex items-center gap-8 mb-12">
          {/* Large Windows Logo */}
          <div className="w-32 h-32 bg-white border-2 border-black grid grid-cols-2 gap-1 p-1 shadow-2xl shadow-black/20">
            <div className="bg-[#f25022] shadow-inner"></div><div className="bg-[#7fba00] shadow-inner"></div>
            <div className="bg-[#00a4ef] shadow-inner"></div><div className="bg-[#ffb900] shadow-inner"></div>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-800 text-lg font-medium leading-none">Microsoft</span>
            <div className="flex items-baseline">
              <span className="text-7xl font-bold text-gray-900 tracking-tighter">Windows</span>
              <span className="text-7xl font-light text-gray-700 ml-1">CR</span>
            </div>
            <span className="text-2xl font-medium text-gray-600 mt-2 tracking-wide">Classic Remastered</span>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-96 h-1 bg-gray-300/50 rounded-full overflow-hidden backdrop-blur-sm mt-8">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-75"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Bottom Right Purple Accent Icon */}
      <div className="absolute bottom-8 right-8 opacity-40">
        <i className="fa-solid fa-bolt-lightning text-3xl text-purple-700 rotate-12"></i>
      </div>
    </div>
  );
}
