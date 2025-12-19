
export type AppId = 'explorer' | 'notepad' | 'clippy' | 'settings' | 'calc' | 'about' | 'taskview' | 'search';

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  params?: any;
}

export interface DesktopIcon {
  id: AppId;
  label: string;
  icon: string;
}
