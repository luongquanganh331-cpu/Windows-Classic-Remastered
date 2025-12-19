
import React from 'react';
import { AppId } from '../types';

interface SearchOverlayProps {
  onClose: () => void;
  onOpenApp: (id: AppId) => void;
}

export default function SearchOverlay({ onClose, onOpenApp }: SearchOverlayProps) {
  const topApps = [
    { id: 'clippy', label: 'Edge', icon: 'fa-brands fa-edge', color: 'text-blue-500' },
    { id: 'explorer', label: 'Files', icon: 'fa-solid fa-folder-open', color: 'text-yellow-600' },
    { id: 'notepad', label: 'Notepad', icon: 'fa-solid fa-file-lines', color: 'text-teal-500' },
    { id: 'notepad', label: 'Paint', icon: 'fa-solid fa-palette', color: 'text-pink-500' },
    { id: 'clippy', label: 'Clippy', icon: 'fa-solid fa-paperclip', color: 'text-gray-400' },
  ];

  const recent = [
    { label: 'About Windows', icon: 'fa-solid fa-window-restore', color: 'text-blue-700' },
    { label: 'Theme', icon: 'fa-solid fa-paintbrush', color: 'text-pink-500' },
    { label: 'Display Settings', icon: 'fa-solid fa-display', color: 'text-blue-600' },
    { label: 'About', icon: 'fa-solid fa-circle-info', color: 'text-blue-800' },
    { label: 'Videos', icon: 'fa-solid fa-folder-open', color: 'text-blue-600' },
  ];

  return (
    <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center pointer-events-none">
       <div 
         className="w-[600px] bg-[#d4d0c8] classic-border shadow-2xl pointer-events-auto animate-window flex flex-col overflow-hidden"
       >
          <div className="window-header-gradient px-4 py-2 flex items-center justify-between">
            <span className="text-white font-bold text-sm">Search</span>
            <button onClick={onClose} className="w-6 h-6 bg-gray-200 border border-white border-r-gray-600 border-b-gray-600 text-xs flex items-center justify-center hover:bg-red-500 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
          </div>

          <div className="p-4 bg-white/50 border-b border-gray-400">
            <div className="bg-white border-2 border-gray-600 p-2 flex items-center gap-3">
              <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
              <input type="text" placeholder="Type here to search" className="flex-1 outline-none text-sm" autoFocus />
              <div className="flex items-center gap-1 p-1 bg-gray-200 border border-gray-400 rounded">
                 <div className="w-3 h-3 grid grid-cols-2 gap-0.5">
                   <div className="bg-[#f25022]"></div><div className="bg-[#7fba00]"></div>
                   <div className="bg-[#00a4ef]"></div><div className="bg-[#ffb900]"></div>
                 </div>
                 <i className="fa-solid fa-chevron-down text-[8px] text-gray-600"></i>
              </div>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-6 bg-gray-300/40">
             {/* Top Apps */}
             <div>
                <h3 className="text-xs font-bold text-gray-700 mb-4">Top apps</h3>
                <div className="grid grid-cols-5 gap-4">
                   {topApps.map(app => (
                     <div 
                        key={app.label} 
                        onClick={() => onOpenApp(app.id as AppId)}
                        className="flex flex-col items-center gap-3 p-4 bg-white/20 border-2 border-transparent hover:border-gray-400 hover:bg-white/50 transition-all cursor-pointer group"
                      >
                        <i className={`${app.icon} text-3xl ${app.color} group-hover:scale-110 transition-transform`}></i>
                        <span className="text-[11px] font-medium text-gray-800">{app.label}</span>
                     </div>
                   ))}
                </div>
             </div>

             <div className="flex gap-6">
                {/* Recent */}
                <div className="flex-1">
                   <h3 className="text-xs font-bold text-gray-700 mb-4">Recent</h3>
                   <div className="space-y-1">
                      {recent.map(item => (
                        <div key={item.label} className="flex items-center gap-4 p-2 bg-white/40 border border-gray-400/50 hover:bg-blue-600 hover:text-white cursor-pointer group transition-colors">
                           <div className="w-8 h-8 flex items-center justify-center bg-white rounded border border-gray-300">
                              <i className={`${item.icon} text-sm ${item.color}`}></i>
                           </div>
                           <span className="text-[11px] font-medium flex-1">{item.label}</span>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Quick Searches */}
                <div className="w-2/5">
                   <h3 className="text-xs font-bold text-gray-700 mb-4">Quick searches</h3>
                   <div className="space-y-2">
                      <button className="w-full p-2 bg-gray-200 border border-gray-400 flex items-center gap-3 text-xs font-bold hover:bg-white transition-colors">
                         <i className="fa-solid fa-arrows-rotate text-gray-500"></i>
                         Refresh
                      </button>
                      
                      {[
                        { label: 'Today in history', icon: 'fa-regular fa-clock' },
                        { label: 'New movies', icon: 'fa-solid fa-clapperboard' },
                        { label: 'Funny Memes', icon: 'fa-solid fa-cat' },
                      ].map(search => (
                        <div key={search.label} className="p-4 bg-white/40 border border-gray-400/50 flex items-center gap-4 hover:bg-white cursor-pointer transition-colors group">
                           <div className="w-8 h-8 rounded-full bg-gray-300/50 flex items-center justify-center">
                              <i className={`${search.icon} text-sm text-gray-600`}></i>
                           </div>
                           <span className="text-[11px] font-medium">{search.label}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
