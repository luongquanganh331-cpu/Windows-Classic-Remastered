
import React, { useState, useEffect } from 'react';

interface DashboardProps {
  onClose: () => void;
}

const Widget: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <div className={`flex flex-col bg-[#d4d0c8] classic-border shadow-lg ${className}`}>
    <div className="window-header-gradient px-3 py-1.5 flex justify-between items-center">
      <span className="text-white text-xs font-bold">{title}</span>
      <button className="w-5 h-5 bg-gray-200 border border-white border-r-gray-600 border-b-gray-600 text-[10px] flex items-center justify-center">
        <i className="fa-solid fa-ellipsis"></i>
      </button>
    </div>
    <div className="flex-1 p-3 overflow-hidden">
      {children}
    </div>
  </div>
);

export default function Dashboard({ onClose }: DashboardProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[140] bg-black/10 backdrop-blur-xl animate-window flex items-center justify-center p-4 lg:p-12 pointer-events-none">
      <div className="w-full max-w-7xl h-full flex flex-col bg-[#d4d0c8] classic-border shadow-2xl pointer-events-auto overflow-hidden">
        {/* Dashboard Title Bar */}
        <div className="window-header-gradient px-4 py-2 flex items-center justify-between">
          <span className="text-white font-bold text-sm">Dashboard</span>
          <div className="flex gap-1">
            <button className="w-6 h-6 bg-gray-200 border border-white border-r-gray-600 border-b-gray-600 text-xs flex items-center justify-center"><i className="fa-solid fa-list"></i></button>
            <button onClick={onClose} className="w-6 h-6 bg-gray-200 border border-white border-r-gray-600 border-b-gray-600 text-xs flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
              <i className="fa-solid fa-plus rotate-45"></i>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-auto bg-gray-400/20">
          
          {/* Clock Widget */}
          <Widget title="Clock" className="row-span-1">
            <div className="flex flex-col items-center justify-center h-full">
               <div className="w-40 h-40 rounded-full border-4 border-teal-600 relative flex items-center justify-center bg-white/40 mb-4">
                  {/* Ticks */}
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute w-1.5 h-1.5 bg-teal-800" 
                      style={{ transform: `rotate(${i * 30}deg) translateY(-68px)` }}
                    ></div>
                  ))}
                  {/* Hands */}
                  <div className="absolute w-1 h-16 bg-gray-800 top-4 origin-bottom rounded-full" style={{ transform: `rotate(${(time.getHours() % 12) * 30 + time.getMinutes() / 2}deg)` }}></div>
                  <div className="absolute w-1.5 h-14 bg-teal-600 top-6 origin-bottom rounded-full" style={{ transform: `rotate(${time.getMinutes() * 6}deg)` }}></div>
                  <div className="w-2.5 h-2.5 bg-black rounded-full z-10 shadow-md"></div>
               </div>
               <span className="text-2xl font-bold font-mono text-gray-800 tracking-widest">
                 {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
               </span>
            </div>
          </Widget>

          {/* Watchlist Widget */}
          <Widget title="Watchlist">
            <div className="space-y-3">
              {[
                { name: 'NOT', sub: 'Nothing', val: '10.283', chg: '+11.21%', up: true },
                { name: 'IDK', sub: "I don't know", val: '16.2001', chg: '+9991', up: true },
              ].map(stock => (
                <div key={stock.name} className="flex flex-col bg-white/50 classic-border p-2">
                   <div className="flex justify-between items-center">
                     <div>
                       <span className="text-xs font-bold block">{stock.name}</span>
                       <span className="text-[10px] text-gray-500">{stock.sub}</span>
                     </div>
                     <div className="text-right">
                       <span className="text-xs font-bold block">{stock.val}</span>
                       <span className={`text-[10px] font-bold ${stock.up ? 'text-green-600' : 'text-red-600'}`}>{stock.chg}</span>
                     </div>
                     <button className="ml-3 start-btn w-6 h-6 flex items-center justify-center text-xs"><i className="fa-solid fa-plus"></i></button>
                   </div>
                </div>
              ))}
              <button className="w-full start-btn py-1 text-xs font-bold mt-2">Go to watchlist</button>
            </div>
          </Widget>

          {/* Media Player Widget */}
          <Widget title="Media Player" className="lg:col-span-1">
             <div className="flex flex-col h-full bg-black/90 p-1 rounded">
               <div className="flex-1 flex items-center justify-center">
                  <i className="fa-solid fa-play text-4xl text-white/20"></i>
               </div>
               <div className="p-2 space-y-2">
                 <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                   <div className="w-1/3 h-full bg-teal-400"></div>
                 </div>
                 <div className="flex justify-between items-center text-white/70">
                   <div className="flex gap-3">
                     <i className="fa-solid fa-play text-xs cursor-pointer hover:text-white"></i>
                     <i className="fa-solid fa-pause text-xs cursor-pointer hover:text-white"></i>
                     <i className="fa-solid fa-stop text-xs cursor-pointer hover:text-white"></i>
                   </div>
                   <div className="flex gap-4">
                     <i className="fa-solid fa-backward-step text-xs cursor-pointer hover:text-white"></i>
                     <i className="fa-solid fa-backward text-xs cursor-pointer hover:text-white"></i>
                     <i className="fa-solid fa-forward text-xs cursor-pointer hover:text-white"></i>
                     <i className="fa-solid fa-forward-step text-xs cursor-pointer hover:text-white"></i>
                   </div>
                 </div>
               </div>
             </div>
          </Widget>

          {/* Calendar Widget */}
          <Widget title="Calendar">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-4 px-2">
                 <span className="text-xs font-bold text-gray-600">August</span>
                 <div className="flex gap-4 text-[11px] font-bold">
                    <span className="opacity-40">23</span>
                    <span className="bg-teal-600 text-white px-1.5 rounded-sm">24</span>
                    <span className="opacity-40">25</span>
                 </div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center opacity-60">
                 <p className="text-xs font-medium text-gray-500 mb-4">No events today</p>
                 <button className="start-btn px-6 py-1.5 text-xs font-bold">Create event</button>
              </div>
            </div>
          </Widget>

          {/* To Do Widget */}
          <Widget title="To do">
            <div className="space-y-4">
               <div className="flex gap-2">
                  <div className="flex-1 bg-white border border-gray-400 p-1 flex justify-between items-center">
                     <span className="text-xs text-gray-600">Monday</span>
                     <i className="fa-solid fa-chevron-down text-[8px] opacity-40"></i>
                  </div>
                  <button className="start-btn w-8 h-8 flex items-center justify-center"><i className="fa-solid fa-plus"></i></button>
               </div>
               <div className="flex flex-col items-center py-8 opacity-60">
                  <p className="text-xs font-medium text-gray-500 mb-4">Get started with To Do</p>
                  <button className="start-btn px-6 py-1.5 text-xs font-bold">Add a task</button>
               </div>
            </div>
          </Widget>

          {/* Weather Widget */}
          <Widget title="Weather">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                 <div className="flex items-center gap-4">
                    <i className="fa-solid fa-sun text-4xl text-yellow-500"></i>
                    <span className="text-4xl font-bold">18°</span>
                 </div>
                 <div className="text-right">
                    <div className="flex items-center gap-2 text-[10px] text-gray-600 bg-white/40 border border-gray-300 px-2 py-0.5 rounded">
                      <i className="fa-solid fa-location-dot"></i> Tokyo, JP <i className="fa-solid fa-pencil text-[8px]"></i>
                    </div>
                 </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                 {[
                   { day: 'Monday', icon: 'fa-sun', color: 'text-yellow-600', temp: '17° 12°', hum: '17%' },
                   { day: 'Tuesday', icon: 'fa-cloud', color: 'text-gray-400', temp: '20° 14°', hum: '22%' },
                   { day: 'Wednesday', icon: 'fa-sun', color: 'text-yellow-600', temp: '19° 13°', hum: '21%' },
                 ].map(item => (
                   <div key={item.day} className="bg-white/40 classic-border p-2 flex flex-col items-center gap-1">
                      <span className="text-[10px] font-bold text-gray-500">{item.day}</span>
                      <i className={`fa-solid ${item.icon} text-xl ${item.color} my-2`}></i>
                      <span className="text-[10px] font-bold">{item.temp}</span>
                      <div className="flex items-center gap-1 text-[8px] opacity-60">
                        <i className="fa-solid fa-droplet text-[6px]"></i> {item.hum}
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full start-btn py-1 text-xs font-bold">See weather forecast</button>
            </div>
          </Widget>

        </div>
      </div>
    </div>
  );
}
