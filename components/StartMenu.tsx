
import React, { useState } from 'react';
import { AppId } from '../types';

interface StartMenuProps {
  onClose: () => void;
  onOpenApp: (id: AppId) => void;
  onLock?: () => void;
  onShutdown?: () => void;
}

export default function StartMenu({ onClose, onOpenApp, onLock, onShutdown }: StartMenuProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const pinnedApps = [
    { id: 'clippy', label: 'Edge', icon: 'fa-brands fa-edge', color: 'text-blue-500' },
    { id: 'notepad', label: 'Paint', icon: 'fa-solid fa-palette', color: 'text-pink-500' },
    { id: 'notepad', label: 'Mail', icon: 'fa-solid fa-envelope', color: 'text-blue-400' },
    { id: 'settings', label: 'Settings', icon: 'fa-solid fa-toolbox', color: 'text-yellow-600' },
    { id: 'calc', label: 'Calendar', icon: 'fa-solid fa-calendar', color: 'text-red-500' },
    { id: 'notepad', label: 'Notepad', icon: 'fa-solid fa-file-lines', color: 'text-teal-500' },
  ];

  const programs = [
    { letter: 'A', items: [
      { label: 'Access', icon: 'fa-solid fa-database', color: 'text-red-800' },
      { label: 'Accessibility', icon: 'fa-solid fa-folder', color: 'text-yellow-500', expandable: true },
    ]},
    { letter: 'C', items: [
      { label: 'Calculator', icon: 'fa-solid fa-calculator', color: 'text-teal-600' },
      { label: 'Calendar', icon: 'fa-solid fa-calendar-days', color: 'text-blue-400' },
      { label: 'Camera', icon: 'fa-solid fa-camera', color: 'text-gray-600' },
      { label: 'Clipchamp', icon: 'fa-solid fa-film', color: 'text-purple-600' },
      { label: 'Clippy', icon: 'fa-solid fa-paperclip', color: 'text-gray-400' },
      { label: 'Clock', icon: 'fa-solid fa-clock', color: 'text-red-500' },
    ]},
    { letter: 'E', items: []}
  ];

  return (
    <div className="absolute bottom-12 left-0 w-[600px] h-[550px] bg-[#d4d0c8] border-2 border-white border-r-gray-600 border-b-gray-600 flex z-[101] shadow-2xl animate-window origin-bottom-left overflow-hidden">
      {/* Side Banner */}
      <div className="w-12 start-menu-banner flex items-end justify-center text-white font-bold text-xl py-6 tracking-tighter">
        Windows<span className="font-light opacity-80">CR</span>
      </div>

      <div className="flex-1 flex gap-0.5 p-0.5">
        {/* Left Pane */}
        <div className="w-1/2 flex flex-col p-3 border-r border-gray-400">
          {/* Search Bar */}
          <div className="mb-4 bg-white border-2 border-gray-600 p-2 flex items-center gap-3 shadow-inner">
            <i className="fa-solid fa-magnifying-glass text-gray-500 text-sm"></i>
            <input 
              type="text" 
              placeholder="Type here to search" 
              className="flex-1 outline-none text-xs" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Pinned Section */}
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-bold text-gray-800">Pinned</span>
              <button className="text-[10px] bg-gray-200 border border-white border-r-gray-500 border-b-gray-500 px-3 py-1 flex items-center gap-2 hover:bg-white active:bg-gray-300">
                <i className="fa-solid fa-folder-tree text-yellow-600"></i>
                Programs <i className="fa-solid fa-chevron-right text-[8px]"></i>
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-y-4">
              {pinnedApps.map(app => (
                <button 
                  key={app.label}
                  onClick={() => onOpenApp(app.id as AppId)}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div className={`text-3xl ${app.color} drop-shadow-sm group-hover:scale-110 transition-transform`}>
                    <i className={app.icon}></i>
                  </div>
                  <span className="text-[10px] font-bold text-gray-700">{app.label}</span>
                </button>
              ))}
            </div>

            {/* System Folders */}
            <div className="border-t border-gray-400 mt-4 pt-4 space-y-1">
              {[
                { label: 'Favorites', icon: 'fa-solid fa-star', color: 'text-yellow-500', hasChevron: true },
                { label: 'Documents', icon: 'fa-solid fa-folder', color: 'text-yellow-500', hasChevron: true },
                { label: 'Help', icon: 'fa-solid fa-book', color: 'text-purple-700' },
                { label: 'Run...', icon: 'fa-solid fa-hourglass-start', color: 'text-red-700' },
              ].map(item => (
                <button key={item.label} className="w-full text-left px-3 py-2 text-xs font-bold text-gray-800 hover:bg-blue-700 hover:text-white flex items-center gap-4 transition-colors">
                  <div className={`w-5 flex justify-center ${item.color}`}><i className={item.icon}></i></div>
                  <span className="flex-1">{item.label}</span>
                  {item.hasChevron && <i className="fa-solid fa-chevron-right text-[8px] opacity-40"></i>}
                </button>
              ))}
            </div>
          </div>

          {/* User & Shutdown Footer */}
          <div className="mt-4 flex gap-2">
            <button className="flex-1 start-btn h-10 px-3 flex items-center gap-3 hover:bg-white transition-colors">
              <div className="w-6 h-6 rounded-full bg-blue-600 border border-white flex items-center justify-center overflow-hidden">
                <i className="fa-solid fa-user-group text-[8px] text-white"></i>
              </div>
              <span className="text-xs font-bold text-gray-800">Abdi</span>
            </button>
            <button onClick={onShutdown} className="flex-1 start-btn h-10 px-3 flex items-center gap-3 hover:bg-white transition-colors">
              <div className="w-6 h-6 bg-blue-900 border border-white flex items-center justify-center">
                 <i className="fa-solid fa-moon text-[8px] text-white"></i>
              </div>
              <span className="text-xs font-bold text-gray-800">Shut Down...</span>
            </button>
          </div>
        </div>

        {/* Right Pane (Programs) */}
        <div className="w-1/2 bg-[#d4d0c8]/50 flex flex-col p-3 overflow-auto custom-scrollbar">
          <div className="flex justify-between items-center mb-4 px-1">
             <span className="text-xs font-bold text-gray-800">Programs</span>
             <div className="relative group">
               <button className="text-[10px] bg-gray-200 border border-white border-r-gray-500 border-b-gray-500 px-3 py-1 flex items-center gap-2">
                 Name list <i className="fa-solid fa-chevron-down text-[8px]"></i>
               </button>
             </div>
          </div>

          <div className="space-y-6">
            {programs.map(group => (
              <div key={group.letter}>
                <div className="w-7 h-7 bg-gray-200 border-2 border-white border-r-gray-600 border-b-gray-600 flex items-center justify-center text-xs font-bold text-gray-800 mb-3 shadow-sm">
                  {group.letter}
                </div>
                <div className="space-y-1">
                  {group.items.map(item => (
                    <button key={item.label} className="w-full text-left px-2 py-2 flex items-center gap-4 hover:bg-white/40 transition-colors">
                      <div className={`w-8 flex justify-center text-xl ${item.color} drop-shadow-sm`}><i className={item.icon}></i></div>
                      <span className="flex-1 text-xs font-bold text-gray-800">{item.label}</span>
                      {item.expandable && <i className="fa-solid fa-chevron-right text-[8px] opacity-40"></i>}
                    </button>
                  ))}
                  {group.letter === 'E' && <div className="h-20"></div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
