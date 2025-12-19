
import React, { useState, useEffect } from 'react';

interface ShutdownProps {
  onComplete: () => void;
}

export default function Shutdown({ onComplete }: ShutdownProps) {
  const [stage, setStage] = useState<'dialog' | 'animation' | 'black'>('dialog');
  const [action, setAction] = useState<'sleep' | 'shutdown' | 'restart'>('shutdown');

  const startShutdown = () => {
    setStage('animation');
  };

  useEffect(() => {
    if (stage === 'animation') {
      const duration = 4000;
      const timer = setTimeout(() => {
        setStage('black');
      }, duration);
      return () => clearTimeout(timer);
    }
    
    if (stage === 'black') {
      const timeout = setTimeout(onComplete, 1000);
      return () => clearTimeout(timeout);
    }
  }, [stage, onComplete]);

  const skyWallpaper = "https://images.unsplash.com/photo-1534088568595-a066f7701de2?q=80&w=1920&auto=format&fit=crop";

  return (
    <div 
      className={`fixed inset-0 z-[400] bg-cover bg-center flex items-center justify-center transition-all duration-1000 ${stage === 'black' ? 'opacity-0 scale-105' : 'opacity-100'}`}
      style={{ backgroundImage: `url('${skyWallpaper}')` }}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>

      {stage === 'dialog' && (
        <div className="relative animate-window bg-[#d4d0c8] classic-border w-[420px] shadow-2xl overflow-hidden">
          <div className="window-header-gradient px-3 py-1.5 flex items-center justify-between">
            <span className="text-white text-xs font-bold">Shut Down Windows</span>
            <button onClick={onComplete} className="w-5 h-5 bg-gray-200 border border-white border-r-gray-600 border-b-gray-600 text-[10px] flex items-center justify-center"><i className="fa-solid fa-xmark"></i></button>
          </div>
          <div className="p-8 flex flex-col items-center">
             <div className="w-full flex gap-8 mb-8">
                {/* Left side Icon */}
                <div className="w-20 h-20 flex flex-col items-center">
                   <div className="w-14 h-12 border-2 border-gray-800 bg-gray-300 rounded relative overflow-hidden flex items-center justify-center shadow-lg">
                      <div className="w-full h-full bg-blue-900 flex items-center justify-center">
                         <i className="fa-solid fa-moon text-white text-xl animate-pulse"></i>
                      </div>
                      <div className="absolute bottom-0 w-full h-1 bg-gray-600"></div>
                   </div>
                   <div className="w-8 h-2 bg-gray-400 border-x-2 border-gray-800"></div>
                   <div className="w-12 h-2 bg-gray-400 border-2 border-gray-800"></div>
                </div>

                {/* Right side Choices */}
                <div className="flex-1 space-y-4">
                   <h3 className="text-sm font-bold text-gray-800 mb-6">What do you want the PC to do?</h3>
                   
                   <div className="space-y-3">
                      {[
                        { id: 'sleep', label: 'Sleep' },
                        { id: 'shutdown', label: 'Shut Down' },
                        { id: 'restart', label: 'Restart' }
                      ].map(opt => (
                        <label key={opt.id} className="flex items-center gap-3 group cursor-pointer">
                           <div className="relative w-5 h-5">
                              <input 
                                type="radio" 
                                name="shutdown-opt" 
                                className="peer hidden" 
                                checked={action === opt.id} 
                                onChange={() => setAction(opt.id as any)}
                              />
                              <div className="w-5 h-5 rounded-full bg-white border-2 border-gray-600 peer-checked:border-teal-600 transition-colors"></div>
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                           </div>
                           <span className="text-xs font-bold text-gray-700 group-hover:text-black">{opt.label}</span>
                        </label>
                      ))}
                   </div>
                </div>
             </div>

             <div className="flex justify-center w-full gap-3 pt-4 border-t border-gray-400/30">
                <button onClick={startShutdown} className="start-btn min-w-[80px] px-6 py-2 text-xs font-bold text-gray-800 hover:bg-white active:scale-95 transition-all">OK</button>
                <button onClick={onComplete} className="start-btn min-w-[80px] px-6 py-2 text-xs font-bold text-gray-800 hover:bg-white active:scale-95 transition-all">Cancel</button>
                <button className="start-btn min-w-[80px] px-6 py-2 text-xs font-bold text-gray-800 hover:bg-white active:scale-95 transition-all">Help</button>
             </div>
          </div>
        </div>
      )}

      {stage === 'animation' && (
        <div className="relative flex flex-col items-center animate-window text-gray-900">
          <div className="flex items-center gap-10 mb-16">
            <div className="w-32 h-32 bg-white border-2 border-black grid grid-cols-2 gap-1 p-1.5 shadow-2xl">
              <div className="bg-[#f25022]"></div><div className="bg-[#7fba00]"></div>
              <div className="bg-[#00a4ef]"></div><div className="bg-[#ffb900]"></div>
            </div>

            <div className="flex flex-col">
              <span className="text-3xl font-medium tracking-tight leading-none mb-1">Microsoft</span>
              <div className="flex items-baseline">
                <span className="text-8xl font-bold tracking-tighter">Windows</span>
                <span className="text-8xl font-light ml-2 opacity-80">CR</span>
              </div>
              <span className="text-3xl font-medium opacity-70 mt-3 tracking-widest uppercase">Classic Remastered</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
             <div className="w-5 h-5 border-2 border-gray-400 border-t-black rounded-full animate-spin"></div>
             <span className="text-xl font-medium opacity-80 tracking-wide">
               {action === 'shutdown' ? 'Shutting down...' : action === 'restart' ? 'Restarting...' : 'Entering sleep mode...'}
             </span>
          </div>

          <div className="fixed bottom-10 right-10 opacity-30">
            <i className="fa-solid fa-bolt-lightning text-4xl text-purple-700 rotate-12"></i>
          </div>
        </div>
      )}
    </div>
  );
}
