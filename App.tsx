
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import DesktopWindow from './components/Window';
import Dashboard from './components/Dashboard';
import QuickSettings from './components/QuickSettings';
import LockScreen from './components/LockScreen';
import Startup from './components/Startup';
import Shutdown from './components/Shutdown';
import TaskView from './components/TaskView';
import SearchOverlay from './components/SearchOverlay';
import { AppId, WindowState } from './types';
import ClippyAI from './apps/ClippyAI';
import Notepad from './apps/Notepad';
import FileExplorer from './apps/FileExplorer';
import Settings from './apps/Settings';

const INITIAL_WINDOWS: WindowState[] = [];

const APP_CONFIG: Record<AppId, { title: string; defaultSize: { width: number; height: number } }> = {
  explorer: { title: 'Files', defaultSize: { width: 900, height: 600 } },
  notepad: { title: 'Notepad', defaultSize: { width: 600, height: 450 } },
  clippy: { title: 'Clippy', defaultSize: { width: 700, height: 500 } },
  settings: { title: 'Settings', defaultSize: { width: 850, height: 650 } },
  calc: { title: 'Calculator', defaultSize: { width: 320, height: 480 } },
  about: { title: 'About Windows', defaultSize: { width: 800, height: 600 } },
  taskview: { title: 'Task View', defaultSize: { width: 800, height: 600 } },
  search: { title: 'Search', defaultSize: { width: 600, height: 500 } },
};

export default function App() {
  const [systemState, setSystemState] = useState<'startup' | 'running' | 'shutdown' | 'off'>('startup');
  const [isLocked, setIsLocked] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>(INITIAL_WINDOWS);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isTaskViewOpen, setIsTaskViewOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const nextZIndex = useRef(10);

  const openApp = (appId: AppId, params?: any) => {
    setIsStartOpen(false);
    setIsSearchOpen(false);
    setIsTaskViewOpen(false);
    
    const existing = windows.find(w => w.appId === appId);
    if (existing) {
      focusWindow(existing.id);
      if (existing.isMinimized) toggleMinimize(existing.id);
      if (params) {
        setWindows(prev => prev.map(w => w.id === existing.id ? { ...w, params } : w));
      }
      return;
    }

    const newId = `${appId}-${Date.now()}`;
    const config = APP_CONFIG[appId];
    
    const newWindow: WindowState = {
      id: newId,
      appId,
      title: config.title,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex.current++,
      position: { x: 100 + (windows.length * 30), y: 50 + (windows.length * 30) },
      size: config.defaultSize,
      params,
    };

    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(newId);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const focusWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: nextZIndex.current++ } : w
    ));
    setActiveWindowId(id);
  };

  const toggleMinimize = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
    ));
    if (activeWindowId === id) setActiveWindowId(null);
    else setActiveWindowId(id);
  };

  const toggleMaximize = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const updatePosition = (id: string, pos: { x: number; y: number }) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, position: pos } : w));
  };

  const handleShutdown = () => {
    setIsStartOpen(false);
    setIsQuickSettingsOpen(false);
    setSystemState('shutdown');
  };

  const handleReboot = () => {
    setSystemState('startup');
    setWindows(INITIAL_WINDOWS);
    setIsLocked(false);
  };

  const renderAppContent = (win: WindowState) => {
    switch (win.appId) {
      case 'clippy': return <ClippyAI />;
      case 'notepad': return <Notepad />;
      case 'explorer': return <FileExplorer />;
      case 'settings': return <Settings initialPage={win.params?.page} />;
      case 'calc': return (
         <div className="p-4 grid grid-cols-4 gap-2 h-full bg-[#d4d0c8]">
           <div className="col-span-4 bg-white border-2 border-gray-600 p-2 text-right text-2xl font-mono mb-2">0</div>
           {[7,8,9,'/',4,5,6,'*',1,2,3,'-','C',0,'=','+'].map(btn => (
             <button key={btn} className="bg-gray-200 border-2 border-white border-r-gray-600 border-b-gray-600 p-3 font-bold hover:bg-gray-100 active:bg-gray-300 active:border-r-white active:border-b-white active:border-t-gray-600 active:border-l-gray-600">{btn}</button>
           ))}
         </div>
      );
      default: return <div className="p-4">App loading...</div>;
    }
  };

  if (systemState === 'startup') {
    return <Startup onComplete={() => {
      setSystemState('running');
      setIsLocked(true);
    }} />;
  }

  if (systemState === 'shutdown') {
    return <Shutdown onComplete={() => setSystemState('off')} />;
  }

  if (systemState === 'off') {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center cursor-none">
        <button 
          onClick={handleReboot}
          className="group relative flex flex-col items-center transition-all hover:scale-110"
        >
          <div className="w-16 h-16 rounded-full bg-gray-900 border-2 border-gray-800 flex items-center justify-center mb-4 group-hover:bg-red-900/20 group-hover:border-red-500 transition-colors">
            <i className="fa-solid fa-power-off text-2xl text-gray-700 group-hover:text-red-500"></i>
          </div>
          <span className="text-gray-800 font-bold text-xs uppercase tracking-widest group-hover:text-gray-500">Power on</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background Teal */}
      <div className="absolute inset-0 bg-[#008080]"></div>

      <Desktop onOpenApp={openApp} />

      {windows.map(win => (
        <DesktopWindow
          key={win.id}
          window={win}
          isActive={activeWindowId === win.id}
          onFocus={() => focusWindow(win.id)}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => toggleMinimize(win.id)}
          onMaximize={() => toggleMaximize(win.id)}
          onMove={(pos) => updatePosition(win.id, pos)}
          children={renderAppContent(win)}
        />
      ))}

      {isStartOpen && (
        <StartMenu 
          onClose={() => setIsStartOpen(false)} 
          onOpenApp={openApp}
          onLock={() => {
            setIsLocked(true);
            setIsStartOpen(false);
          }}
          onShutdown={handleShutdown}
        />
      )}

      {isTaskViewOpen && (
        <TaskView onClose={() => setIsTaskViewOpen(false)} />
      )}

      {isSearchOpen && (
        <SearchOverlay 
          onClose={() => setIsSearchOpen(false)} 
          onOpenApp={openApp}
        />
      )}

      {isDashboardOpen && (
        <Dashboard onClose={() => setIsDashboardOpen(false)} />
      )}

      {isQuickSettingsOpen && (
        <QuickSettings 
          onClose={() => setIsQuickSettingsOpen(false)} 
          onShutdown={handleShutdown}
          onOpenSettings={() => openApp('settings')}
        />
      )}

      <Taskbar 
        windows={windows} 
        activeId={activeWindowId}
        onStartClick={() => setIsStartOpen(!isStartOpen)} 
        onSearchClick={() => setIsSearchOpen(!isSearchOpen)}
        onTaskViewClick={() => setIsTaskViewOpen(!isTaskViewOpen)}
        onDashboardClick={() => setIsDashboardOpen(!isDashboardOpen)}
        onSystemTrayClick={() => setIsQuickSettingsOpen(!isQuickSettingsOpen)}
        onAppClick={(id) => {
          const win = windows.find(w => w.id === id);
          if (win?.isMinimized) toggleMinimize(id);
          else focusWindow(id);
        }}
      />

      {isLocked && (
        <LockScreen onUnlock={() => setIsLocked(false)} onShutdown={handleShutdown} />
      )}
    </div>
  );
}
