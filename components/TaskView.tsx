
import React, { useState } from 'react';

interface TaskViewProps {
  onClose: () => void;
}

export default function TaskView({ onClose }: TaskViewProps) {
  const [desktops, setDesktops] = useState([
    { id: 1, label: 'Desktop 1', active: false },
    { id: 2, label: 'Desktop 2', active: true },
  ]);

  const wallpaper = "https://images.unsplash.com/photo-1506318137071-a8e063b4bcc0?q=80&w=1920&auto=format&fit=crop";

  return (
    <div className="fixed inset-0 z-[150] bg-black/30 backdrop-blur-3xl animate-window flex items-center justify-center p-8">
      <div className="w-full max-w-6xl h-full flex flex-col bg-[#d4d0c8]/95 classic-border shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="window-header-gradient px-4 py-2 flex items-center justify-between">
          <span className="text-white font-bold text-sm">Task View</span>
          <button onClick={onClose} className="w-6 h-6 bg-gray-200 border border-white border-r-gray-600 border-b-gray-600 text-xs flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 flex flex-col gap-12">
          {/* Active App Preview Area (Empty in Screenshot) */}
          <div className="flex-1 border-2 border-gray-400 rounded-lg flex items-center justify-center text-gray-500 font-bold">
             No new apps
          </div>

          {/* Desktop Management Area */}
          <div className="flex-1 flex gap-8 items-start">
             {desktops.map(desktop => (
               <div key={desktop.id} className="group relative w-72 flex flex-col gap-3">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-xs font-bold text-gray-700">{desktop.label}</span>
                    <button className="text-[10px] text-gray-400 hover:text-red-500"><i className="fa-solid fa-xmark"></i></button>
                  </div>
                  <div className={`aspect-video w-full rounded classic-border overflow-hidden transition-all group-hover:scale-[1.02] cursor-pointer ${desktop.active ? 'ring-4 ring-white border-teal-600 border-4' : 'opacity-60 grayscale hover:grayscale-0'}`}>
                    <img src={wallpaper} className="w-full h-full object-cover" alt={desktop.label} />
                    {/* Centered Logo Preview */}
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-8 h-8 bg-white/20 backdrop-blur-sm grid grid-cols-2 gap-0.5 p-0.5 border border-white/50">
                         <div className="bg-[#f25022]"></div><div className="bg-[#7fba00]"></div>
                         <div className="bg-[#00a4ef]"></div><div className="bg-[#ffb900]"></div>
                       </div>
                    </div>
                  </div>
               </div>
             ))}

             {/* New Desktop Button */}
             <div className="w-72 flex flex-col gap-3">
               <span className="text-xs font-bold text-gray-700 px-1">New Desktop</span>
               <div className="aspect-video w-full border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center hover:bg-white/40 cursor-pointer group transition-colors">
                  <i className="fa-solid fa-plus text-3xl text-gray-400 group-hover:scale-110 transition-transform"></i>
               </div>
             </div>
          </div>
        </div>

        {/* Status Area Bottom */}
        <div className="bg-gray-400/20 border-t-2 border-white px-6 py-3 flex justify-between items-center">
          <span className="text-xs font-bold text-gray-700">Desktop 2</span>
          <div className="flex gap-6 text-gray-600">
             <i className="fa-solid fa-display hover:text-black cursor-pointer"></i>
             <i className="fa-regular fa-image hover:text-black cursor-pointer"></i>
             <i className="fa-solid fa-gears hover:text-black cursor-pointer"></i>
             <i className="fa-solid fa-trash-can hover:text-red-500 cursor-pointer"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
