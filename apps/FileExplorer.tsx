
import React, { useState } from 'react';

export default function FileExplorer() {
  const [currentPath, setCurrentPath] = useState(['This PC']);
  const [tabs, setTabs] = useState([{ id: 1, label: 'This PC', path: ['This PC'] }]);
  const [activeTabId, setActiveTabId] = useState(1);

  const sidebarItems = [
    { label: 'This PC', icon: 'fa-solid fa-display', active: true, children: [
      { label: 'Desktop', icon: 'fa-solid fa-desktop' },
      { label: 'Documents', icon: 'fa-regular fa-file-lines' },
      { label: 'Downloads', icon: 'fa-solid fa-download' },
      { label: 'Music', icon: 'fa-solid fa-music' },
      { label: 'Pictures', icon: 'fa-regular fa-image' },
      { label: 'Videos', icon: 'fa-solid fa-video' },
    ]},
    { label: 'Abdi - Personal', icon: 'fa-solid fa-cloud', expandable: true },
    { label: 'Network', icon: 'fa-solid fa-globe', expandable: true },
    { label: 'Recycle Bin', icon: 'fa-solid fa-trash-can' },
    { label: 'Settings', icon: 'fa-solid fa-gears' },
  ];

  const mainPinned = [
    { label: 'Desktop', icon: 'fa-solid fa-folder-open', color: 'text-teal-600' },
    { label: 'Documents', icon: 'fa-solid fa-folder-closed', color: 'text-gray-400' },
    { label: 'Downloads', icon: 'fa-solid fa-folder-plus', color: 'text-emerald-500' },
    { label: 'Music', icon: 'fa-solid fa-folder-minus', color: 'text-pink-500' },
    { label: 'Pictures', icon: 'fa-solid fa-folder-tree', color: 'text-blue-500' },
    { label: 'Videos', icon: 'fa-solid fa-folder-open', color: 'text-indigo-600' },
  ];

  const devices = [
    { label: 'Floppy (A:)', icon: 'fa-solid fa-floppy-disk' },
    { label: '(C:)', icon: 'fa-solid fa-hard-drive' },
    { label: 'Disk (D:)', icon: 'fa-solid fa-compact-disc' },
  ];

  const utilities = [
    { label: 'Dial-Up', icon: 'fa-solid fa-network-wired' },
    { label: 'Printers', icon: 'fa-solid fa-print' },
    { label: 'Scheduled Tasks', icon: 'fa-solid fa-calendar-check' },
    { label: 'Settings', icon: 'fa-solid fa-toolbox' },
    { label: 'Web Folders', icon: 'fa-solid fa-globe' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#d4d0c8] select-none">
      {/* Tabs Bar */}
      <div className="flex items-center px-2 pt-1 gap-1">
        {tabs.map(tab => (
          <div 
            key={tab.id}
            className={`flex items-center gap-4 px-3 py-1.5 min-w-[120px] max-w-[180px] border-2 border-b-0 ${tab.id === activeTabId ? 'bg-[#d4d0c8] border-white border-r-gray-600 shadow-[inset_1px_1px_0_white]' : 'bg-gray-300/50 border-transparent border-b-gray-400 opacity-70'}`}
          >
            <i className="fa-solid fa-display text-[10px] text-teal-700"></i>
            <span className="text-[11px] font-bold flex-1 truncate">{tab.label}</span>
            <i className="fa-solid fa-xmark text-[10px] hover:text-red-500 cursor-pointer"></i>
          </div>
        ))}
        <button className="p-2 hover:bg-white/20 transition-colors"><i className="fa-solid fa-plus text-xs"></i></button>
        <div className="flex-1"></div>
        <div className="p-1.5 bg-black rounded mr-2">
           <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
             <div className="bg-[#f25022]"></div><div className="bg-[#7fba00]"></div>
             <div className="bg-[#00a4ef]"></div><div className="bg-[#ffb900]"></div>
           </div>
        </div>
      </div>

      {/* Ribbon Toolbar */}
      <div className="bg-[#d4d0c8] border-y-2 border-white border-b-gray-500 px-4 py-3 flex gap-8 items-center">
        <div className="flex flex-col items-center gap-1 group cursor-pointer">
          <div className="w-10 h-10 border border-gray-400 rounded flex items-center justify-center hover:bg-white/50"><i className="fa-solid fa-plus text-lg text-gray-700"></i></div>
          <span className="text-[10px] font-medium">New</span>
        </div>
        <div className="w-[1px] h-12 bg-gray-400"></div>
        <div className="flex gap-6">
          {[
            { label: 'Cut', icon: 'fa-solid fa-scissors' },
            { label: 'Copy', icon: 'fa-regular fa-copy' },
            { label: 'Paste', icon: 'fa-solid fa-paste' },
            { label: 'Rename', icon: 'fa-solid fa-signature' },
            { label: 'Share', icon: 'fa-solid fa-arrow-up-from-bracket' },
            { label: 'Delete', icon: 'fa-solid fa-trash-can' },
          ].map(tool => (
            <div key={tool.label} className="flex flex-col items-center gap-1 cursor-pointer group">
              <i className={`${tool.icon} text-lg text-gray-700 group-hover:scale-110 transition-transform`}></i>
              <span className="text-[10px] font-medium">{tool.label}</span>
            </div>
          ))}
        </div>
        <div className="w-[1px] h-12 bg-gray-400"></div>
        <div className="flex gap-6">
          {[
            { label: 'Sort', icon: 'fa-solid fa-arrow-up-wide-short' },
            { label: 'View', icon: 'fa-solid fa-list-ul' },
            { label: 'Filter', icon: 'fa-solid fa-filter' },
          ].map(tool => (
            <div key={tool.label} className="flex flex-col items-center gap-1 cursor-pointer group">
              <i className={`${tool.icon} text-lg text-gray-700`}></i>
              <span className="text-[10px] font-medium flex items-center gap-1">{tool.label} <i className="fa-solid fa-chevron-down text-[8px]"></i></span>
            </div>
          ))}
        </div>
        <div className="w-[1px] h-12 bg-gray-400"></div>
        <div className="flex flex-col items-center gap-1 cursor-pointer">
           <i className="fa-solid fa-ellipsis text-lg text-gray-700"></i>
           <span className="text-[10px] font-medium">Others</span>
        </div>
      </div>

      {/* Address Bar */}
      <div className="p-2 border-b-2 border-white flex gap-2">
        <div className="flex gap-0.5">
          <button className="w-8 h-8 flex items-center justify-center bg-gray-200 border border-white border-r-gray-500 border-b-gray-500"><i className="fa-solid fa-arrow-left text-xs"></i></button>
          <button className="w-8 h-8 flex items-center justify-center bg-gray-200 border border-white border-r-gray-500 border-b-gray-500"><i className="fa-solid fa-arrow-right text-xs"></i></button>
          <button className="w-8 h-8 flex items-center justify-center bg-gray-200 border border-white border-r-gray-500 border-b-gray-500 ml-1"><i className="fa-solid fa-chevron-down text-[10px]"></i></button>
          <button className="w-8 h-8 flex items-center justify-center bg-gray-200 border border-white border-r-gray-500 border-b-gray-500"><i className="fa-solid fa-arrow-up text-xs"></i></button>
        </div>
        <div className="flex-1 bg-white border-2 border-gray-600 border-t-white border-l-white flex items-center px-3 gap-2">
          <i className="fa-solid fa-display text-teal-700 text-xs"></i>
          <i className="fa-solid fa-chevron-right text-[8px] text-gray-400"></i>
          <span className="text-xs">This PC</span>
          <i className="fa-solid fa-chevron-right text-[8px] text-gray-400"></i>
          <div className="flex-1 h-full"></div>
          <button className="text-gray-400"><i className="fa-solid fa-chevron-down text-[8px]"></i></button>
        </div>
      </div>

      {/* Layout Split */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 border-r-2 border-gray-400 p-4 overflow-auto">
          {sidebarItems.map(item => (
            <div key={item.label} className="mb-1">
              <div className={`flex items-center gap-3 p-2 rounded ${item.active ? 'bg-gray-300 border border-gray-400 shadow-inner' : 'hover:bg-gray-200'}`}>
                <i className={`${item.icon} text-sm text-gray-600`}></i>
                <span className="text-xs font-semibold text-gray-800 flex-1">{item.label}</span>
                {item.expandable && <i className="fa-solid fa-chevron-down text-[8px] text-gray-500"></i>}
                {!item.expandable && item.children && <i className="fa-solid fa-chevron-up text-[8px] text-gray-500"></i>}
              </div>
              {item.children && (
                <div className="ml-8 mt-2 space-y-3">
                  {item.children.map(child => (
                    <div key={child.label} className="flex items-center gap-3 py-1 cursor-pointer hover:text-blue-700">
                      <i className={`${child.icon} text-xs text-gray-500`}></i>
                      <span className="text-[11px] font-medium">{child.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* File View Grid */}
        <div className="flex-1 bg-white p-6 overflow-auto">
          {/* Pinned Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <i className="fa-solid fa-chevron-up text-[8px] text-gray-600"></i>
              <h3 className="text-xs font-bold text-gray-700">Pinned</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {mainPinned.map(folder => (
                <div key={folder.label} className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="text-5xl drop-shadow-sm group-hover:scale-110 transition-transform">
                    <i className={`${folder.icon} ${folder.color}`}></i>
                  </div>
                  <span className="text-[11px] font-medium text-gray-700">{folder.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Devices Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <i className="fa-solid fa-chevron-up text-[8px] text-gray-600"></i>
              <h3 className="text-xs font-bold text-gray-700">Devices and drives</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {devices.map(dev => (
                <div key={dev.label} className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="text-4xl text-gray-400 group-hover:text-blue-600 transition-colors">
                    <i className={dev.icon}></i>
                  </div>
                  <span className="text-[11px] font-medium text-gray-700 text-center">{dev.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Utilities Section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <i className="fa-solid fa-chevron-up text-[8px] text-gray-600"></i>
              <h3 className="text-xs font-bold text-gray-700">Utilities files</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {utilities.map(util => (
                <div key={util.label} className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="text-4xl text-yellow-500/80 group-hover:scale-110 transition-transform">
                    <i className={util.icon}></i>
                  </div>
                  <span className="text-[11px] font-medium text-gray-700 text-center leading-tight">{util.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#d4d0c8] border-t-2 border-white px-3 py-1 flex justify-between items-center text-[11px] font-medium text-gray-700">
        <span>14 items</span>
        <div className="flex gap-3">
          <i className="fa-solid fa-bars-staggered cursor-pointer"></i>
          <i className="fa-solid fa-table-cells-large cursor-pointer"></i>
        </div>
      </div>
    </div>
  );
}
