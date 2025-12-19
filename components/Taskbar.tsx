
import React, { useState, useEffect } from 'react';
import { WindowState } from '../types';

interface TaskbarProps {
  windows: WindowState[];
  activeId: string | null;
  onStartClick: () => void;
  onSearchClick: () => void;
  onTaskViewClick: () => void;
  onDashboardClick: () => void;
  onSystemTrayClick: () => void;
  onAppClick: (id: string) => void;
}

export default function Taskbar({ 
  windows, 
  activeId, 
  onStartClick, 
  onSearchClick, 
  onTaskViewClick, 
  onDashboardClick,
  onSystemTrayClick,
  onAppClick 
}: TaskbarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#d4d0c8] border-t-2 border-white flex items-center px-1 z-[150] gap-1 shadow-inner">
      {/* Start Button */}
      <button 
        onClick={onStartClick}
        className="h-9 px-4 flex items-center gap-2.5 start-btn text-gray-900 font-bold hover:brightness-105 active:scale-95 transition-all text-sm shadow-sm"
      >
        <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
          <div className="bg-[#f25022]"></div><div className="bg-[#7fba00]"></div>
          <div className="bg-[#00a4ef]"></div><div className="bg-[#ffb900]"></div>
        </div>
        <span>Start</span>
      </button>

      {/* Quick Launch / Feature Buttons */}
      <div className="flex gap-1 ml-1">
         <button onClick={onSearchClick} className="w-9 h-9 flex items-center justify-center start-btn text-gray-800 hover:bg-white active:scale-90 shadow-sm">
           <i className="fa-solid fa-magnifying-glass text-sm"></i>
         </button>
         <button onClick={onTaskViewClick} className="w-9 h-9 flex items-center justify-center start-btn text-gray-800 hover:bg-white active:scale-90 shadow-sm">
           <i className="fa-solid fa-layer-group text-sm"></i>
         </button>
      </div>

      <div className="h-7 w-[1px] bg-gray-500 mx-2"></div>

      {/* App Icons (Pinned/Running) */}
      <div className="flex gap-3 px-2">
         <div className="flex items-center gap-3">
            <i className="fa-solid fa-magnifying-glass text-yellow-500 cursor-pointer hover:scale-110 transition-transform"></i>
            <i className="fa-brands fa-edge text-blue-500 cursor-pointer hover:scale-110 transition-transform text-lg"></i>
            <i className="fa-solid fa-circle-play text-purple-600 cursor-pointer hover:scale-110 transition-transform text-lg"></i>
         </div>
      </div>

      <div className="flex-1 flex gap-1 items-center overflow-x-auto no-scrollbar h-full px-2">
        {windows.map(win => (
          <button
            key={win.id}
            onClick={() => onAppClick(win.id)}
            className={`h-9 min-w-[120px] max-w-[200px] px-3 flex items-center gap-3 border-2 transition-all truncate ${
              activeId === win.id 
                ? 'bg-white border-white border-r-gray-600 border-b-gray-600 shadow-[inset_1px_1px_0_rgba(0,0,0,0.1)]' 
                : 'bg-[#d4d0c8] border-white border-r-gray-600 border-b-gray-600 hover:bg-gray-100 shadow-sm'
            }`}
          >
            <div className={`w-4 h-4 rounded-sm flex items-center justify-center text-[8px] bg-blue-100 text-blue-800 border border-blue-300`}>
              <i className="fa-solid fa-window-maximize"></i>
            </div>
            <span className="text-gray-900 text-xs font-bold truncate">{win.title}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1">
        {/* Weather Widget */}
        <div 
          onClick={onDashboardClick}
          className="flex items-center gap-3 px-4 bg-gray-100/50 border-2 border-gray-400 border-t-white border-l-white h-9 shadow-inner hover:bg-white cursor-pointer group"
        >
          <i className="fa-solid fa-sun text-yellow-600 text-sm group-hover:scale-110 transition-transform"></i>
          <span className="text-gray-800 text-xs font-bold hidden lg:inline">18° Tokyo</span>
        </div>

        {/* Status Tray */}
        <div 
          onClick={onSystemTrayClick}
          className="flex items-center gap-4 px-4 bg-gray-100/50 border-2 border-gray-400 border-t-white border-l-white h-9 shadow-inner hover:bg-white cursor-pointer"
        >
          <div className="flex gap-4 text-gray-700 text-sm">
            <i className="fa-solid fa-wifi"></i>
            <i className="fa-solid fa-volume-high"></i>
            <i className="fa-solid fa-chart-simple"></i>
          </div>
          <div className="text-gray-900 font-bold text-sm tracking-tighter ml-1">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </div>
        </div>
      </div>
    </div>
  );
}
