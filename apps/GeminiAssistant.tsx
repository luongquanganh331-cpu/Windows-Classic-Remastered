
import React, { useState, useRef, useEffect } from 'react';
import { chatWithGemini } from '../services/gemini';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export default function GeminiAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: 'Welcome to WinClassic Remastered. I am your system assistant. How can I help you navigate the future of the past?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    const currentMessages = [...messages];
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Build history for Gemini context from previous messages
    const geminiHistory = currentMessages.map(m => ({
      role: m.sender === 'user' ? 'user' : 'model' as 'user' | 'model',
      parts: [{ text: m.text }]
    }));

    const response = await chatWithGemini(input, geminiHistory);
    const aiMsg: Message = { id: (Date.now() + 1).toString(), sender: 'ai', text: response || '...' };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#f0f0f0]">
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-4 text-white flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
          <i className="fa-solid fa-brain text-xl"></i>
        </div>
        <div>
          <h2 className="font-bold">System AI Assistant</h2>
          <p className="text-[10px] opacity-80 uppercase tracking-widest">Active Core 3.0</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-xl shadow-sm border ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white border-blue-700' 
                : 'bg-white text-gray-800 border-gray-200'
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="w-12 h-12 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md disabled:bg-gray-400"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
