
import React, { useState, useRef, useEffect } from 'react';
import { WindowState } from '../types';

interface WindowProps {
  window: WindowState;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onMove: (pos: { x: number; y: number }) => void;
  children: React.ReactNode;
  // Explicitly adding key to resolve TS error when used in JSX map in App.tsx
  key?: React.Key;
}

export default function DesktopWindow({
  window: win,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onMove,
  children
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  if (win.isMinimized) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - win.position.x,
      y: e.clientY - win.position.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || win.isMaximized) return;
      onMove({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, win.isMaximized, onMove]);

  const windowStyles: React.CSSProperties = win.isMaximized 
    ? {
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 48px)',
        zIndex: win.zIndex,
      }
    : {
        top: win.position.y,
        left: win.position.x,
        width: win.size.width,
        height: win.size.height,
        zIndex: win.zIndex,
      };

  return (
    <div
      ref={windowRef}
      style={windowStyles}
      className={`absolute flex flex-col bg-[#d4d0c8] border-2 border-white border-r-gray-600 border-b-gray-600 shadow-2xl overflow-hidden animate-window ${isActive ? 'active-window' : 'opacity-95'}`}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div 
        className={`flex items-center justify-between px-2 py-1 cursor-default select-none ${isActive ? 'window-header-gradient' : 'bg-gray-400'}`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-4 h-4 bg-white/20 rounded-sm flex items-center justify-center text-[10px] text-white">...</div>
          <span className="text-white text-xs font-bold truncate drop-shadow-sm">{win.title}</span>
        </div>
        
        <div className="window-controls flex items-center gap-0.5">
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-5 h-5 flex items-center justify-center bg-gray-200 border border-white border-r-gray-600 border-b-gray-600 active:border-r-white active:border-b-white"
          >
            <i className="fa-solid fa-minus text-[8px]"></i>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="w-5 h-5 flex items-center justify-center bg-gray-200 border border-white border-r-gray-600 border-b-gray-600 active:border-r-white active:border-b-white"
          >
            <i className={`fa-regular ${win.isMaximized ? 'fa-window-restore' : 'fa-square'} text-[8px]`}></i>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-5 h-5 flex items-center justify-center bg-gray-200 border border-white border-r-gray-600 border-b-gray-600 active:border-r-white active:border-b-white hover:bg-red-500 hover:text-white"
          >
            <i className="fa-solid fa-xmark text-[8px]"></i>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white border-2 border-gray-600 border-t-white border-l-white overflow-auto relative">
        {children}
      </div>
    </div>
  );
}
