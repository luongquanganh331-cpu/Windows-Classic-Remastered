
import React from 'react';

interface QuickSettingsProps {
  onClose: () => void;
  onShutdown?: () => void;
  onOpenSettings?: () => void;
}

const ToggleButton: React.FC<{ icon: string; label: string; active?: boolean; hasChevron?: boolean }> = ({ icon, label, active, hasChevron }) => (
  <div className="flex flex-col items-center gap-1.5 w-full">
    <button className={`w-full aspect-[2/1.1] flex items-center justify-center classic-border transition-all group ${active ? 'bg-white shadow-[inset_2px_2px_0_rgba(0,0,0,0.1)]' : 'bg-[#d4d0c8] hover:bg-white/50'}`}>
       <div className="flex items-center gap-4">
          <i className={`fa-solid ${icon} text-lg ${active ? 'text-blue-600' : 'text-gray-700'}`}></i>
          {hasChevron && <i className="fa-solid fa-chevron-right text-[10px] text-gray-400"></i>}
       </div>
    </button>
    <span className="text-[11px] font-medium text-gray-700">{label}</span>
  </div>
);

export default function QuickSettings({ onClose, onShutdown, onOpenSettings }: QuickSettingsProps) {
  return (
    <div className="fixed inset-0 z-[160] flex items-end justify-end p-4 pointer-events-none pb-16 pr-6">
      <div className="w-[360px] bg-[#d4d0c8] classic-border shadow-2xl animate-window origin-bottom-right flex flex-col pointer-events-auto">
        
        {/* Header */}
        <div className="window-header-gradient px-4 py-2 flex items-center">
          <span className="text-white font-bold text-sm">Quick settings</span>
        </div>

        {/* Control Grid */}
        <div className="p-6 grid grid-cols-3 gap-y-6 gap-x-4">
          <ToggleButton icon="fa-wifi" label="Galaxy S26" active hasChevron />
          <ToggleButton icon="fa-bluetooth-b" label="Bluetooth" />
          <ToggleButton icon="fa-plane" label="Airplane mode" />
          
          <ToggleButton icon="fa-circle-minus" label="Do not disturb" hasChevron />
          <ToggleButton icon="fa-location-dot" label="Location" />
          <ToggleButton icon="fa-universal-access" label="Accessibility" />

          <ToggleButton icon="fa-expand" label="Screenshot" />
          <ToggleButton icon="fa-keyboard" label="Keyboard layout" hasChevron />
          <ToggleButton icon="fa-signal" label="Mobile hotspot" />
        </div>

        {/* Sliders */}
        <div className="px-6 py-4 space-y-6">
           {/* Volume */}
           <div className="flex items-center gap-4">
              <i className="fa-solid fa-volume-high text-sm text-gray-700 w-6"></i>
              <div className="flex-1 relative h-1 bg-gray-400/50 rounded-full flex items-center">
                 <div className="w-1/3 h-full bg-teal-600 rounded-full"></div>
                 {/* Classic Slider Thumb */}
                 <div className="absolute left-1/3 -ml-2 w-3.5 h-6 bg-gray-200 border-2 border-white border-r-gray-600 border-b-gray-600 shadow-sm cursor-pointer"></div>
              </div>
              <i className="fa-solid fa-chevron-right text-[10px] text-gray-500"></i>
           </div>
           {/* Brightness */}
           <div className="flex items-center gap-4">
              <i className="fa-solid fa-sun text-sm text-gray-700 w-6"></i>
              <div className="flex-1 relative h-1 bg-gray-400/50 rounded-full flex items-center">
                 <div className="w-2/3 h-full bg-teal-600 rounded-full"></div>
                 {/* Classic Slider Thumb */}
                 <div className="absolute left-2/3 -ml-2 w-3.5 h-6 bg-gray-200 border-2 border-white border-r-gray-600 border-b-gray-600 shadow-sm cursor-pointer"></div>
              </div>
           </div>
        </div>

        {/* Bottom User Bar */}
        <div className="mx-4 mb-4 mt-2 p-2 bg-white/20 classic-border border-gray-400 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center border-2 border-white overflow-hidden shadow-inner">
                 <i className="fa-solid fa-user text-white text-xs"></i>
              </div>
              <span className="text-xs font-bold text-gray-800">Abdi</span>
           </div>
           <div className="flex gap-4 text-gray-600">
              <i className="fa-solid fa-pencil text-[10px] hover:text-black cursor-pointer"></i>
              <i className="fa-solid fa-user-gear text-[10px] hover:text-black cursor-pointer"></i>
              <i onClick={onOpenSettings} className="fa-solid fa-gears text-[10px] hover:text-black cursor-pointer"></i>
              <i onClick={onShutdown} className="fa-solid fa-power-off text-[10px] hover:text-red-500 cursor-pointer"></i>
           </div>
        </div>
      </div>
    </div>
  );
}
