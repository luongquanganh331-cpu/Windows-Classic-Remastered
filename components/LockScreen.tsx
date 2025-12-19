
import React, { useState, useEffect } from 'react';

interface LockScreenProps {
  onUnlock: () => void;
  onShutdown?: () => void;
}

export default function LockScreen({ onUnlock, onShutdown }: LockScreenProps) {
  const [view, setView] = useState<'glance' | 'login'>('glance');
  const [time, setTime] = useState(new Date());
  const [username, setUsername] = useState('Abdi');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleGlanceClick = () => {
    setView('login');
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    onUnlock();
  };

  const wallpaper = "https://images.unsplash.com/photo-1506318137071-a8e063b4bcc0?q=80&w=1920&auto=format&fit=crop";

  return (
    <div 
      className="absolute inset-0 z-[200] flex flex-col items-center justify-center bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url('${wallpaper}')` }}
      onClick={view === 'glance' ? handleGlanceClick : undefined}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>

      {view === 'glance' ? (
        <div className="relative w-full h-full flex flex-col items-center justify-center animate-window">
          {/* Top Lock Icon */}
          <div className="absolute top-10 flex flex-col items-center opacity-80">
            <i className="fa-solid fa-lock text-white text-xl mb-1"></i>
          </div>

          {/* Center Clock Widget */}
          <div className="bg-[#d4d0c8]/90 classic-border p-8 flex items-center gap-12 shadow-2xl transition-transform hover:scale-[1.02] cursor-pointer">
            {/* Analog Clock Simulation */}
            <div className="w-24 h-24 rounded-full border-2 border-teal-600 relative flex items-center justify-center bg-white/50">
              <div className="absolute w-0.5 h-10 bg-gray-800 top-2 origin-bottom rotate-[45deg] rounded-full"></div>
              <div className="absolute w-1 h-8 bg-teal-600 top-4 origin-bottom rotate-[180deg] rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-black rounded-full z-10"></div>
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-0.5 h-1 bg-gray-400" 
                  style={{ transform: `rotate(${i * 30}deg) translateY(-40px)` }}
                ></div>
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-6xl font-bold text-gray-800 tracking-tight">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
              </span>
              <span className="text-sm font-semibold text-gray-600 mt-1">
                {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>

          <p className="mt-8 text-white/70 text-sm font-medium animate-pulse">Click or press any key to unlock</p>

          {/* Bottom Widgets */}
          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
            {/* Weather */}
            <div className="bg-[#d4d0c8]/90 classic-border w-72 overflow-hidden shadow-lg hidden md:block">
              <div className="window-header-gradient px-2 py-1 flex justify-between items-center">
                <span className="text-[10px] text-white font-bold">Weather</span>
                <i className="fa-solid fa-ellipsis text-white text-[8px]"></i>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-sun text-yellow-500 text-3xl"></i>
                  <div>
                    <div className="text-2xl font-bold">18°</div>
                    <div className="text-[10px] text-gray-500 flex items-center gap-1">
                      <i className="fa-solid fa-location-dot"></i> Tokyo, JP
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-gray-700">Very Sunny</div>
                  <div className="text-[10px] text-gray-500">12° / 13°</div>
                </div>
              </div>
            </div>

            {/* Markets */}
            <div className="bg-[#d4d0c8]/90 classic-border w-80 overflow-hidden shadow-lg hidden lg:block">
              <div className="window-header-gradient px-2 py-1 flex justify-between items-center">
                <span className="text-[10px] text-white font-bold">Markets</span>
                <i className="fa-solid fa-ellipsis text-white text-[8px]"></i>
              </div>
              <div className="p-3 grid grid-cols-3 gap-2">
                {[
                  { name: 'NOT', val: '10.283.01', chg: '+11.21%', up: true },
                  { name: 'IDK', val: '16.2001.66', chg: '+9991.14%', up: true },
                  { name: 'WHAT?', val: '0.003.9867', chg: '-7.99%', up: false }
                ].map(stock => (
                  <div key={stock.name} className="bg-gray-200/50 p-2 border border-gray-300 rounded">
                    <div className="text-[8px] font-bold text-gray-600">{stock.name}</div>
                    <div className={`text-[8px] font-bold ${stock.up ? 'text-green-600' : 'text-red-600'}`}>{stock.chg}</div>
                    <div className="text-[9px] font-mono text-gray-800 truncate">{stock.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Tray (Mini) with Power Button */}
          <div className="absolute bottom-6 right-6 flex items-center gap-3 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs">
            <button onClick={(e) => { e.stopPropagation(); onShutdown?.(); }} className="hover:text-red-400 transition-colors">
              <i className="fa-solid fa-power-off"></i>
            </button>
            <div className="w-[1px] h-3 bg-white/30"></div>
            <i className="fa-solid fa-wifi"></i>
            <i className="fa-solid fa-volume-high"></i>
          </div>
        </div>
      ) : (
        <div className="relative animate-window flex flex-col items-center">
          <form 
            onSubmit={handleSignIn}
            className="bg-[#d4d0c8] classic-border w-[450px] overflow-hidden shadow-2xl"
          >
            <div className="window-header-gradient px-3 py-1.5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-key text-white text-xs"></i>
                <span className="text-white text-xs font-bold">Welcome to Windows</span>
              </div>
              <div className="flex gap-1">
                <button type="button" className="w-5 h-5 bg-gray-200 border border-white border-r-gray-600 border-b-gray-600 text-[10px] flex items-center justify-center">?</button>
                <button type="button" onClick={() => setView('glance')} className="w-5 h-5 bg-gray-200 border border-white border-r-gray-600 border-b-gray-600 text-[10px] flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"><i className="fa-solid fa-xmark"></i></button>
              </div>
            </div>

            <div className="p-8 flex flex-col items-center">
              <p className="text-xs text-gray-700 font-medium mb-6 text-center">Type a username and password to log on to Windows.</p>
              
              <div className="relative mb-8">
                 <div className="w-16 h-16 bg-white border-2 border-black grid grid-cols-2 gap-1 p-1 shadow-lg transform rotate-6">
                    <div className="bg-orange-500"></div><div className="bg-green-500"></div>
                    <div className="bg-blue-500"></div><div className="bg-yellow-500"></div>
                 </div>
                 <i className="fa-solid fa-key absolute -bottom-2 -right-4 text-3xl text-yellow-500 drop-shadow-md -rotate-12"></i>
              </div>

              <div className="w-full space-y-4 max-w-xs">
                <div className="flex items-center gap-4">
                  <label className="text-xs font-bold text-gray-700 w-20 text-right">Username:</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex-1 border-2 border-gray-600 border-t-white border-l-white bg-white px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-blue-400" 
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="text-xs font-bold text-gray-700 w-20 text-right">Password:</label>
                  <input 
                    type="password" 
                    value={password}
                    autoFocus
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 border-2 border-gray-600 border-t-white border-l-white bg-white px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-blue-400" 
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button 
                  type="submit"
                  className="start-btn px-10 py-1.5 text-xs font-bold text-gray-800 hover:bg-white active:scale-95 transition-all"
                >
                  Sign in
                </button>
                <button 
                  type="button"
                  onClick={() => onShutdown?.()}
                  className="start-btn px-6 py-1.5 text-xs font-bold text-gray-800 hover:bg-white active:scale-95 transition-all"
                >
                  Shut Down...
                </button>
              </div>
            </div>

            <div className="bg-gray-100/50 p-2 border-t border-gray-300 flex justify-end gap-2">
              <button type="button" className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded hover:bg-white text-gray-600" title="Network"><i className="fa-solid fa-wifi text-sm"></i></button>
              <button type="button" className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded hover:bg-white text-gray-600" title="Accessibility"><i className="fa-solid fa-universal-access text-sm"></i></button>
              <button type="button" onClick={() => onShutdown?.()} className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded hover:bg-white text-red-600" title="Shut Down"><i className="fa-solid fa-power-off text-sm"></i></button>
            </div>
          </form>
          <p className="mt-8 text-white/50 text-[10px] tracking-widest font-bold uppercase">Windows Classic Remastered v2.5</p>
        </div>
      )}
    </div>
  );
}
