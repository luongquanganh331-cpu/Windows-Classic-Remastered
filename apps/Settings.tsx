
import React, { useState, useEffect } from 'react';

interface SettingsProps {
  initialPage?: string;
}

export default function Settings({ initialPage }: SettingsProps) {
  const [currentPage, setCurrentPage] = useState(initialPage || 'home');

  const settingsIcons = [
    { id: 'about', label: 'About', icon: 'fa-solid fa-circle-info', color: 'text-blue-700' },
    { id: 'accessibility', label: 'Accessibility', icon: 'fa-solid fa-universal-access', color: 'text-blue-500' },
    { id: 'account', label: 'Account', icon: 'fa-solid fa-user-group', color: 'text-gray-700' },
    { id: 'hardware', label: 'Add New Hardware', icon: 'fa-solid fa-microchip', color: 'text-emerald-600' },
    { id: 'apps', label: 'Apps', icon: 'fa-solid fa-table-cells', color: 'text-indigo-500' },
    { id: 'bluetooth', label: 'Bluetooth', icon: 'fa-brands fa-bluetooth', color: 'text-blue-600' },
    { id: 'datetime', label: 'Date & Time', icon: 'fa-solid fa-calendar-days', color: 'text-red-600' },
    { id: 'display', label: 'Display settings', icon: 'fa-solid fa-ruler-combined', color: 'text-amber-600' },
    { id: 'fonts', label: 'Fonts', icon: 'fa-solid fa-font', color: 'text-teal-600' },
    { id: 'gaming', label: 'Gaming', icon: 'fa-solid fa-gamepad', color: 'text-gray-400' },
    { id: 'internet', label: 'Internet', icon: 'fa-solid fa-globe', color: 'text-blue-400' },
    { id: 'keyboard', label: 'Keyboard', icon: 'fa-solid fa-keyboard', color: 'text-gray-600' },
    { id: 'mouse', label: 'Mouse', icon: 'fa-solid fa-mouse-pointer', color: 'text-gray-300' },
    { id: 'network', label: 'Network', icon: 'fa-solid fa-network-wired', color: 'text-blue-600' },
    { id: 'notifications', label: 'Notifications', icon: 'fa-solid fa-bell', color: 'text-yellow-500' },
    { id: 'power', label: 'Power', icon: 'fa-solid fa-plug', color: 'text-gray-500' },
    { id: 'privacy', label: 'Privacy', icon: 'fa-solid fa-lock', color: 'text-yellow-600' },
    { id: 'printers', label: 'Printers', icon: 'fa-solid fa-print', color: 'text-gray-400' },
    { id: 'regional', label: 'Regional settings', icon: 'fa-solid fa-earth-americas', color: 'text-green-600' },
    { id: 'search', label: 'Search', icon: 'fa-solid fa-magnifying-glass', color: 'text-teal-400' },
    { id: 'security', label: 'Security settings', icon: 'fa-solid fa-shield-halved', color: 'text-blue-600' },
    { id: 'sound', label: 'Sound', icon: 'fa-solid fa-volume-high', color: 'text-gray-400' },
    { id: 'theme', label: 'Theme', icon: 'fa-solid fa-paintbrush', color: 'text-pink-500' },
    { id: 'update', label: 'Update', icon: 'fa-solid fa-arrows-rotate', color: 'text-emerald-500' },
  ];

  const renderHome = () => (
    <div className="p-8 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-y-10 gap-x-4">
      {settingsIcons.map(item => (
        <div 
          key={item.id} 
          onClick={() => setCurrentPage(item.id)}
          className="flex flex-col items-center gap-3 cursor-pointer group"
        >
          <div className={`text-4xl ${item.color} drop-shadow-sm group-hover:scale-110 transition-transform`}>
            <i className={item.icon}></i>
          </div>
          <span className="text-[11px] font-medium text-gray-700 text-center leading-tight">{item.label}</span>
        </div>
      ))}
    </div>
  );

  const renderAbout = () => (
    <div className="p-6 flex-1 flex flex-col">
       <div className="flex border-b border-gray-400 mb-6 overflow-x-auto">
          {['General', 'Device Manager', 'Hardware Profiles', 'Performance'].map(tab => (
            <div key={tab} className={`px-4 py-1.5 text-xs font-semibold cursor-pointer border border-gray-400 border-b-0 -mb-[1px] ${tab === 'General' ? 'bg-[#d4d0c8] shadow-[inset_1px_1px_0_white]' : 'bg-gray-300 opacity-60'}`}>
              {tab === 'General' && <i className="fa-solid fa-circle-info mr-2 opacity-60"></i>}
              {tab === 'Device Manager' && <i className="fa-solid fa-microchip mr-2 opacity-60"></i>}
              {tab}
            </div>
          ))}
       </div>

       <div className="flex-1 flex gap-10">
          <div className="w-1/3 flex flex-col items-center gap-12">
            <div className="flex flex-col items-center">
               <div className="w-48 h-40 bg-gray-300 border-2 border-gray-800 flex items-center justify-center p-4 relative shadow-lg">
                  <div className="w-32 h-24 bg-white border-2 border-black grid grid-cols-2 gap-1 p-1">
                    <div className="bg-[#f25022]"></div><div className="bg-[#7fba00]"></div>
                    <div className="bg-[#00a4ef]"></div><div className="bg-[#ffb900]"></div>
                  </div>
                  {/* Monitor Stand */}
                  <div className="absolute -bottom-10 w-16 h-8 bg-gray-400 border-x-2 border-t-2 border-gray-800"></div>
                  <div className="absolute -bottom-12 w-32 h-4 bg-gray-400 border-2 border-gray-800"></div>
               </div>
            </div>

            <div className="w-full space-y-4">
              <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Manufactured and supported by:</p>
              <div className="w-32 h-32 bg-blue-900 flex items-center justify-center p-4 relative">
                 <div className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[70px] border-b-white relative">
                    <div className="absolute top-10 -left-1 w-2 h-2 bg-blue-900 rounded-full"></div>
                 </div>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-6">
             <div className="bg-white/50 classic-border border-gray-400 p-6 flex justify-between items-start">
                <div>
                   <h3 className="font-bold text-sm text-gray-900">DESKTOP-WIN1995</h3>
                   <p className="text-xs text-gray-500">General</p>
                </div>
                <button className="start-btn px-4 py-1 text-xs font-bold shadow-sm">Rename this PC</button>
             </div>

             <div className="bg-white/50 classic-border border-gray-400 p-6">
                <div className="flex items-center gap-3 mb-6">
                   <i className="fa-solid fa-table-cells text-gray-700"></i>
                   <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Windows specifications</h3>
                </div>
                <div className="grid grid-cols-2 gap-y-4 gap-x-12">
                   {[
                     { l: 'Edition', v: 'Windows Classic Pro' },
                     { l: 'Update', v: '95H2' },
                     { l: 'Installed on', v: '8/24/1995' },
                     { l: 'OS Build', v: '950.r6' },
                   ].map(row => (
                     <React.Fragment key={row.l}>
                        <span className="text-xs font-semibold text-gray-600">{row.l}</span>
                        <span className="text-xs font-medium text-gray-900">{row.v}</span>
                     </React.Fragment>
                   ))}
                </div>
             </div>

             <div className="bg-white/50 classic-border border-gray-400 p-6">
                <div className="flex items-center gap-3 mb-6">
                   <i className="fa-solid fa-circle-info text-gray-700"></i>
                   <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Device specifications</h3>
                </div>
                <div className="grid grid-cols-2 gap-y-4 gap-x-12">
                   {[
                     { l: 'Device name', v: 'DESKTOP-WIN1995' },
                     { l: 'Processor', v: 'Ulticore® Max™ 2025-A705 CPU @ 5.00 GHz 4.50 GHz' },
                     { l: 'Installed RAM', v: '32.0 GB (31.9 GB usable) DDR6' },
                     { l: 'System type', v: '64-bit operating system, x64-based processor' },
                     { l: 'Pen and touch', v: 'Touch supported' },
                   ].map(row => (
                     <React.Fragment key={row.l}>
                        <span className="text-xs font-semibold text-gray-600">{row.l}</span>
                        <span className="text-xs font-medium text-gray-900">{row.v}</span>
                     </React.Fragment>
                   ))}
                </div>
             </div>
          </div>
       </div>

       <div className="mt-auto flex justify-end gap-2 pt-6">
          <button onClick={() => setCurrentPage('home')} className="start-btn px-8 py-1.5 text-xs font-bold">OK</button>
          <button onClick={() => setCurrentPage('home')} className="start-btn px-8 py-1.5 text-xs font-bold">Cancel</button>
          <button disabled className="start-btn px-8 py-1.5 text-xs font-bold opacity-50">Apply</button>
       </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#d4d0c8]">
       {/* Settings Navigation Bar */}
       <div className="bg-[#d4d0c8] border-b-2 border-white px-1 pt-1 flex items-center gap-1">
          <div className="flex items-center gap-3 px-3 py-1.5 bg-[#d4d0c8] border-2 border-white border-b-0 border-r-gray-600 shadow-[inset_1px_1px_0_white]">
            <i className={`fa-solid ${currentPage === 'home' ? 'fa-house' : 'fa-circle-info'} text-[10px] text-teal-700`}></i>
            <span className="text-[11px] font-bold capitalize">{currentPage === 'home' ? 'Home' : currentPage}</span>
          </div>
          <button className="p-2 hover:bg-white/20"><i className="fa-solid fa-plus text-xs"></i></button>
          <div className="flex-1"></div>
          <div className="p-1.5 bg-black rounded mr-2">
             <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
               <div className="bg-[#f25022]"></div><div className="bg-[#7fba00]"></div>
               <div className="bg-[#00a4ef]"></div><div className="bg-[#ffb900]"></div>
             </div>
          </div>
       </div>

       <div className="bg-[#d4d0c8] border-b-2 border-white border-b-gray-500 px-4 py-3 flex gap-8 items-center shadow-sm">
        <div onClick={() => setCurrentPage('home')} className="flex flex-col items-center gap-1 cursor-pointer group">
          <div className="w-10 h-10 border border-gray-400 rounded flex items-center justify-center hover:bg-white/50 transition-colors"><i className="fa-solid fa-house text-lg text-gray-700"></i></div>
          <span className="text-[10px] font-medium">Home</span>
        </div>
        <div className="w-[1px] h-12 bg-gray-400"></div>
        <div className="flex gap-6">
          {[
            { label: 'Cut', icon: 'fa-solid fa-scissors' },
            { label: 'Copy', icon: 'fa-regular fa-copy' },
            { label: 'Paste', icon: 'fa-solid fa-paste' },
            { label: 'Rename', icon: 'fa-solid fa-signature' },
          ].map(tool => (
            <div key={tool.label} className="flex flex-col items-center gap-1 cursor-not-allowed opacity-30">
              <i className={`${tool.icon} text-lg text-gray-700`}></i>
              <span className="text-[10px] font-medium">{tool.label}</span>
            </div>
          ))}
        </div>
        <div className="w-[1px] h-12 bg-gray-400"></div>
        <div className="flex gap-6">
          {[
            { label: 'Sort', icon: 'fa-solid fa-arrow-up-wide-short' },
            { label: 'View', icon: 'fa-solid fa-list-ul' },
          ].map(tool => (
            <div key={tool.label} className="flex flex-col items-center gap-1 cursor-pointer group">
              <i className={`${tool.icon} text-lg text-gray-700`}></i>
              <span className="text-[10px] font-medium flex items-center gap-1">{tool.label} <i className="fa-solid fa-chevron-down text-[8px]"></i></span>
            </div>
          ))}
        </div>
        <div className="w-[1px] h-12 bg-gray-400"></div>
        <div className="flex-1 h-full"></div>
        <div className="flex flex-col items-center gap-1 cursor-pointer">
           <i className="fa-solid fa-ellipsis text-lg text-gray-700"></i>
           <span className="text-[10px] font-medium">Others</span>
        </div>
      </div>

      {/* Address Bar */}
      <div className="p-2 border-b-2 border-white flex gap-2">
        <div className="flex gap-0.5">
          <button onClick={() => setCurrentPage('home')} className="w-8 h-8 flex items-center justify-center bg-gray-200 border border-white border-r-gray-500 border-b-gray-500 active:bg-white"><i className="fa-solid fa-arrow-left text-xs"></i></button>
          <button className="w-8 h-8 flex items-center justify-center bg-gray-200 border border-white border-r-gray-500 border-b-gray-500 opacity-50"><i className="fa-solid fa-arrow-right text-xs"></i></button>
          <button className="w-8 h-8 flex items-center justify-center bg-gray-200 border border-white border-r-gray-500 border-b-gray-500"><i className="fa-solid fa-arrow-up text-xs"></i></button>
        </div>
        <div className="flex-1 bg-white border-2 border-gray-600 border-t-white border-l-white flex items-center px-3 gap-2">
          <i className="fa-solid fa-house text-teal-700 text-xs"></i>
          <i className="fa-solid fa-chevron-right text-[8px] text-gray-400"></i>
          <span className="text-xs">Home</span>
          {currentPage !== 'home' && (
            <>
              <i className="fa-solid fa-chevron-right text-[8px] text-gray-400"></i>
              <span className="text-xs capitalize">{currentPage}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white/40">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'about' && renderAbout()}
        {currentPage !== 'home' && currentPage !== 'about' && (
           <div className="p-20 flex flex-col items-center justify-center opacity-40">
              <i className="fa-solid fa-hammer text-6xl mb-4"></i>
              <h2 className="text-xl font-bold">This page is under construction</h2>
              <p className="text-sm">The remastered experience is coming soon.</p>
           </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-[#d4d0c8] border-t-2 border-white px-3 py-1 flex justify-between items-center text-[11px] font-medium text-gray-700">
        <span>24 items</span>
        <div className="flex gap-3">
          <i className="fa-solid fa-bars-staggered cursor-pointer"></i>
          <i className="fa-solid fa-table-cells-large cursor-pointer"></i>
        </div>
      </div>
    </div>
  );
}
