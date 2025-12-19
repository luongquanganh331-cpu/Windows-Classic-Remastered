
import React from 'react';
import { AppId, DesktopIcon } from '../types';

// Define DesktopProps interface
interface DesktopProps {
  onOpenApp: (appId: AppId) => void;
}

const ICONS: DesktopIcon[] = [
  { id: 'explorer', label: 'This PC', icon: 'fa-solid fa-display' },
  { id: 'about', label: 'Recycle Bin', icon: 'fa-solid fa-trash-can' },
  { id: 'clippy', label: 'Microsoft Edge', icon: 'fa-brands fa-edge' },
];

const DesktopIconItem: React.FC<{ icon: DesktopIcon; onClick: () => void }> = ({ icon, onClick }) => {
  return (
    <div 
      className="flex flex-col items-center justify-center p-3 rounded hover:bg-white/10 group cursor-pointer w-24 h-24 transition-all"
      onDoubleClick={onClick}
    >
      <div className={`text-5xl drop-shadow-lg group-hover:scale-110 transition-transform mb-3 ${
        icon.id === 'explorer' ? 'text-gray-200' : 
        icon.id === 'about' ? 'text-emerald-100' : 
        'text-blue-500'
      }`}>
        <i className={icon.icon}></i>
      </div>
      <span className="text-white text-xs font-bold drop-shadow-md text-center px-1 rounded leading-tight">
        {icon.label}
      </span>
    </div>
  );
};

export default function Desktop({ onOpenApp }: DesktopProps) {
  return (
    <div className="absolute inset-0 pt-10 pl-6 flex flex-col gap-8 items-start content-start z-10 pointer-events-auto">
      {ICONS.map(icon => (
        <DesktopIconItem key={icon.id} icon={icon} onClick={() => onOpenApp(icon.id)} />
      ))}
    </div>
  );
}