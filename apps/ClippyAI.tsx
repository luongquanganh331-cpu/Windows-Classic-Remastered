
import React, { useState, useRef, useEffect } from 'react';
import { chatWithGemini } from '../services/gemini';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export default function ClippyAI() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: "**Windows 95** was a groundbreaking operating system released by Microsoft on **August 24, 1995**. It marked a major leap forward in personal computing by combining MS-DOS and Windows into a single, user-friendly platform. Windows 95 introduces the revolutionary features like Start menu, taskbar, and Windows Explorer which still central to Windows today.\n\nIt was a massive commercial success and helped cement Microsoft's dominance in the PC market. Want to see what it looked like or try it in a browser? There are emulators online that let you relive the nostalgia." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (customPrompt?: string) => {
    const promptText = customPrompt || input;
    if (!promptText.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: promptText };
    const currentMessages = [...messages];
    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInput('');
    setIsLoading(true);

    const geminiHistory = currentMessages.map(m => ({
      role: m.sender === 'user' ? 'user' : 'model' as 'user' | 'model',
      parts: [{ text: m.text }]
    }));

    const response = await chatWithGemini(promptText, geminiHistory);
    const aiMsg: Message = { id: (Date.now() + 1).toString(), sender: 'ai', text: response || '...' };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex h-full bg-[#8e9bb3]">
      {/* Conversations Sidebar */}
      <div className="w-64 bg-[#8e9bb3] border-r border-[#6a7a92] flex flex-col shadow-[inset_-2px_0_5px_rgba(0,0,0,0.1)]">
        <div className="p-4 border-b border-[#6a7a92]/50">
          <h3 className="text-gray-700 text-sm font-semibold opacity-70">Conversations</h3>
        </div>
        <div className="flex-1 overflow-auto p-2">
          {/* Placeholder conversation list */}
          <div className="p-3 bg-white/10 rounded border border-white/10 text-xs text-gray-800 font-medium mb-1 cursor-pointer">What is Windows 95?</div>
        </div>
        <div className="p-2 flex gap-2">
           <button className="flex-1 start-btn h-10 flex items-center justify-center text-gray-700"><i className="fa-solid fa-layer-group text-sm"></i></button>
           <button className="flex-1 start-btn h-10 flex items-center justify-center text-gray-700"><i className="fa-solid fa-pen-to-square text-sm"></i></button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-auto p-8 flex flex-col gap-8" ref={scrollRef}>
          
          {messages.map((msg, idx) => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              {msg.sender === 'user' ? (
                <div className="bg-white classic-border border-gray-400 px-6 py-2 rounded-2xl shadow-md text-xs font-semibold text-gray-800 max-w-[80%] relative">
                   {msg.text}
                   <div className="absolute -bottom-2 -right-1 w-4 h-4 bg-white border-r-2 border-b-2 border-gray-400 rotate-45"></div>
                </div>
              ) : (
                <div className="flex flex-col items-start w-full">
                  <div className="relative mb-6 bg-[#fffec8] border-2 border-black p-6 rounded-lg shadow-xl max-w-2xl transform -rotate-1">
                    <div className="absolute top-0 left-0 right-0 h-4 border-b border-blue-200/50"></div>
                    <div className="prose prose-sm text-gray-800 whitespace-pre-wrap leading-relaxed text-xs">
                      {msg.text}
                    </div>
                    {/* Interactive controls like thumbs */}
                    <div className="mt-4 flex gap-1">
                      <button className="w-8 h-8 flex items-center justify-center border border-gray-400 bg-white/50 hover:bg-white text-[10px]"><i className="fa-regular fa-thumbs-up"></i></button>
                      <button className="w-8 h-8 flex items-center justify-center border border-gray-400 bg-white/50 hover:bg-white text-[10px]"><i className="fa-regular fa-thumbs-down"></i></button>
                      <button className="w-8 h-8 flex items-center justify-center border border-gray-400 bg-white/50 hover:bg-white text-[10px]"><i className="fa-regular fa-copy"></i></button>
                    </div>
                    {/* Tail */}
                    <div className="absolute -bottom-4 left-12 w-8 h-8">
                       <div className="w-6 h-6 bg-[#fffec8] border-b-2 border-r-2 border-black rotate-45 transform -translate-y-4"></div>
                    </div>
                  </div>
                  
                  {/* Clippy Avatar */}
                  <div className="ml-8 w-32 h-32 flex items-center justify-center filter drop-shadow-2xl">
                    <img src="https://upload.wikimedia.org/wikipedia/en/d/dc/Clippy.png" className="w-full h-full object-contain" alt="Clippy" />
                  </div>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex flex-col items-start opacity-60">
              <div className="w-12 h-12 border-4 border-gray-400 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Message Input Bar */}
        <div className="p-8 pb-10">
          <div className="max-w-3xl mx-auto bg-white border-2 border-gray-600 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)] p-4">
             <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-gray-500 ml-1">Message Clippy</span>
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2 px-3 py-1 bg-gray-200 border border-gray-400 rounded group cursor-pointer hover:bg-white">
                      <img src="https://upload.wikimedia.org/wikipedia/en/d/dc/Clippy.png" className="w-4 h-4 object-contain" alt="ClippyMini" />
                      <span className="text-[10px] font-bold text-gray-700">Quick response</span>
                      <i className="fa-solid fa-chevron-down text-[8px] text-gray-500"></i>
                   </div>
                   <input 
                      type="text" 
                      className="flex-1 outline-none text-sm placeholder:italic"
                      placeholder="Type a message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <div className="flex gap-1">
                      <button className="w-10 h-8 flex items-center justify-center bg-gray-300 border border-gray-500 hover:bg-white active:bg-gray-400"><i className="fa-solid fa-plus text-xs"></i></button>
                      <button className="w-10 h-8 flex items-center justify-center bg-gray-300 border border-gray-500 hover:bg-white active:bg-gray-400"><i className="fa-solid fa-microphone text-xs"></i></button>
                    </div>
                </div>
             </div>
          </div>
          <p className="text-[10px] text-center text-gray-500 mt-4 leading-relaxed opacity-80">
            Clippy uses AI. Check for mistakes. Conversations are used to train AI and Clippy can learn about your interests.<br/>
            Change this anytime in your settings or learn more.
          </p>
        </div>
      </div>
    </div>
  );
}
