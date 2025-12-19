
import React, { useState } from 'react';

export default function Notepad() {
  const [content, setContent] = useState('Welcome to WinClassic Remastered Notepad.\n\nType your notes here. Everything is persistent in your mind (not yet saved to disk!).');

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 border-b border-gray-300 px-2 py-1 flex gap-4 text-xs">
        <button className="hover:bg-gray-200 px-2 py-1 rounded">File</button>
        <button className="hover:bg-gray-200 px-2 py-1 rounded">Edit</button>
        <button className="hover:bg-gray-200 px-2 py-1 rounded">Format</button>
        <button className="hover:bg-gray-200 px-2 py-1 rounded">View</button>
        <button className="hover:bg-gray-200 px-2 py-1 rounded">Help</button>
      </div>
      <textarea
        className="flex-1 p-4 resize-none focus:outline-none font-mono text-sm leading-relaxed"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="bg-gray-100 border-t border-gray-300 px-4 py-1 flex justify-between text-[10px] text-gray-500">
        <span>Ln 1, Col 1</span>
        <span>100% UTF-8</span>
      </div>
    </div>
  );
}
