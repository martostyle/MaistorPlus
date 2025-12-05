
import React, { useState } from 'react';
import { Send, Paperclip, AlertTriangle, ShieldAlert, User, MoreVertical } from 'lucide-react';
import GlassCard from './GlassCard';
import { MOCK_CHATS } from '../services/mockData';
import { ChatSession, ChatMessage } from '../types';

const RISK_KEYWORDS = ['на ръка', 'банков превод', 'без договор', 'cash', 'revolut', 'извън сайта', 'вайбър', 'viber'];

const ChatSystem: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(MOCK_CHATS[0]);
  const [messageInput, setMessageInput] = useState('');
  const [chats, setChats] = useState<ChatSession[]>(MOCK_CHATS);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;

    // Check for Risk Keywords (Transaction Leakage Monitoring)
    const isRisky = RISK_KEYWORDS.some(keyword => messageInput.toLowerCase().includes(keyword));

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      text: messageInput,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      isRiskFlagged: isRisky
    };

    const updatedChats = chats.map(c => {
      if (c.id === selectedChat.id) {
        return {
          ...c,
          messages: [...c.messages, newMessage],
          lastMessage: messageInput
        };
      }
      return c;
    });

    setChats(updatedChats);
    // Update selected chat reference to force re-render of messages
    setSelectedChat(updatedChats.find(c => c.id === selectedChat.id) || null);
    setMessageInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[700px]">
      {/* Contact List */}
      <GlassCard className="col-span-1 flex flex-col !p-0 overflow-hidden">
        <div className="p-4 border-b border-white/10 bg-black/20">
          <h3 className="font-bold text-white">Съобщения</h3>
        </div>
        <div className="flex-grow overflow-y-auto">
          {chats.map(chat => (
            <div 
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors flex gap-3 ${selectedChat?.id === chat.id ? 'bg-white/10' : ''}`}
            >
              <img src={chat.partnerAvatar} alt={chat.partnerName} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-white text-sm truncate">{chat.partnerName}</h4>
                  {chat.unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-xs truncate">{chat.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Chat Area */}
      <GlassCard className="col-span-1 md:col-span-2 flex flex-col !p-0 overflow-hidden relative">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-black/20 flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <img src={selectedChat.partnerAvatar} className="w-10 h-10 rounded-full" />
                 <div>
                   <h4 className="font-bold text-white">{selectedChat.partnerName}</h4>
                   <span className="text-green-400 text-xs flex items-center gap-1">
                     <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Онлайн
                   </span>
                 </div>
              </div>
              <button className="text-gray-400 hover:text-white"><MoreVertical size={20}/></button>
            </div>

            {/* Liability Disclaimer Banner */}
            <div className="bg-amber-500/10 border-b border-amber-500/20 p-2 text-center">
              <p className="text-xs text-amber-200 flex items-center justify-center gap-2">
                <ShieldAlert size={14} />
                <strong>Внимание:</strong> Платформата е само информационен посредник. Само договори, сключени през системата, са защитени от Фонд "Качество".
              </p>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-black/10">
              {/* System Intro Message */}
              <div className="flex justify-center my-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 max-w-md text-center text-xs text-gray-400">
                  Това е началото на чата с {selectedChat.partnerName}. 
                  Припомняме, че платформата следи за ключови думи с цел сигурност.
                </div>
              </div>

              {selectedChat.messages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.senderId === 'me' ? 'items-end' : 'items-start'}`}>
                  <div 
                    className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                      msg.senderId === 'me' 
                        ? 'bg-cyan-600 text-white rounded-tr-none' 
                        : 'bg-white/10 text-gray-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  
                  {/* Risk Warning if flagged */}
                  {msg.isRiskFlagged && msg.senderId === 'me' && (
                    <div className="flex items-center gap-1 text-[10px] text-red-400 mt-1 bg-red-500/10 px-2 py-0.5 rounded">
                      <AlertTriangle size={10} />
                      Системата засече опит за договаряне извън платформата. Това носи риск за вас.
                    </div>
                  )}
                  
                  <span className="text-[10px] text-gray-500 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-black/20">
               <div className="flex gap-2">
                 <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                   <Paperclip size={20} />
                 </button>
                 <input 
                   type="text" 
                   value={messageInput}
                   onChange={(e) => setMessageInput(e.target.value)}
                   onKeyDown={handleKeyPress}
                   placeholder="Напишете съобщение..."
                   className="flex-grow bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white focus:border-cyan-400 outline-none"
                 />
                 <button 
                   onClick={handleSendMessage}
                   className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full transition-colors shadow-lg shadow-cyan-500/20"
                 >
                   <Send size={20} />
                 </button>
               </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Изберете разговор от списъка
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default ChatSystem;
