import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Minimize2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/gemini';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome to Liwisi. I'm your design assistant. How can I help you elevate your space today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const responseText = await sendMessageToGemini(userMessage.text);
      const aiMessage: ChatMessage = { role: 'model', text: responseText };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { role: 'model', text: "I apologize, but I'm having trouble connecting. Please try again.", isError: true };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div 
        className={`
          bg-white rounded-2xl shadow-2xl w-[350px] md:w-[400px] overflow-hidden transition-all duration-500 origin-bottom-right border border-gray-100
          ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-10 pointer-events-none'}
        `}
        style={{ maxHeight: '600px', height: '70vh' }}
      >
        {/* Header */}
        <div className="bg-liwisi-black text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-liwisi-gold to-yellow-200 flex items-center justify-center">
               <Sparkles className="w-4 h-4 text-black" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm">Liwisi Assistant</h3>
              <p className="text-[10px] text-gray-400">Powered by Gemini</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
            <Minimize2 className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-grow overflow-y-auto p-4 bg-gray-50 h-[calc(100%-130px)]">
          <div className="flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-liwisi-black text-white self-end rounded-tr-none' 
                    : 'bg-white border border-gray-200 text-gray-800 self-start rounded-tl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="self-start bg-white border border-gray-200 p-3 rounded-xl rounded-tl-none shadow-sm flex gap-1 items-center">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t border-gray-100">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about design, size, or sales..."
              className="w-full pl-4 pr-12 py-3 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:border-liwisi-gold focus:ring-1 focus:ring-liwisi-gold text-sm transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-liwisi-black text-white rounded-full flex items-center justify-center hover:bg-liwisi-gold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          mt-4 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 z-50
          ${isOpen ? 'bg-gray-200 text-gray-600 rotate-90 opacity-0 pointer-events-none' : 'bg-liwisi-black text-white hover:scale-110 hover:bg-liwisi-gold'}
        `}
        aria-label="Toggle Chat"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
      
      {/* Backup Close for when open but button hidden */}
      {isOpen && (
          <button 
            onClick={() => setIsOpen(false)}
            className="mt-4 w-12 h-12 rounded-full shadow-lg bg-white text-gray-800 hover:text-red-500 flex items-center justify-center transition-all hover:rotate-90"
          >
              <X className="w-6 h-6" />
          </button>
      )}
    </div>
  );
};
