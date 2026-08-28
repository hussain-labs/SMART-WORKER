import React, { useState, useEffect, useRef, useContext } from 'react';
import { MessageSquare, X, Send, Search, Minus, ChevronDown } from 'lucide-react';
import { NotificationContext } from '../../../context/NotificationContext';

const ChatWidget = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);
  const { addNotification } = useContext(NotificationContext) || {};

  const storageKey = `smartWorkerChats_${user?.email || 'guest'}`;
  const widgetRef = useRef(null);

  // Outside click & Escape key listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  // Load chats on mount
  useEffect(() => {
    const savedChats = localStorage.getItem(storageKey);
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    }
  }, [storageKey]);

  // Save chats on update
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(chats));
  }, [chats, storageKey]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, activeChatId]);

  // Listen for 'open-chat' custom event
  useEffect(() => {
    const handleOpenChat = (e) => {
      const worker = e.detail;
      setIsOpen(true);
      
      const existingChat = chats.find(c => c.participantId === (worker._id || worker.email || worker.name));
      if (existingChat) {
        setActiveChatId(existingChat.id);
      } else {
        const newChat = {
          id: Date.now().toString(),
          participantId: worker._id || worker.email || worker.name,
          participant: {
            name: worker.name,
            role: 'Worker',
            avatarBase64: worker.avatarBase64,
            isAvailable: worker.isAvailable
          },
          messages: [
            {
              id: Date.now() + 1,
              senderId: user?.email,
              text: `Hi ${worker.name}, I'm interested in working with you on a project!`,
              timestamp: new Date().toISOString()
            }
          ]
        };
        setChats(prev => [newChat, ...prev]);
        setActiveChatId(newChat.id);
      }
    };

    window.addEventListener('open-chat', handleOpenChat);
    return () => window.removeEventListener('open-chat', handleOpenChat);
  }, [chats, user]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChatId) return;

    const currentChat = chats.find(c => c.id === activeChatId);

    const newMessage = {
      id: Date.now(),
      senderId: user?.email,
      text: messageInput.trim(),
      timestamp: new Date().toISOString()
    };

    setChats(prev => prev.map(c => 
      c.id === activeChatId 
        ? { ...c, messages: [...c.messages, newMessage] } 
        : c
    ));
    setMessageInput('');

    if (addNotification && currentChat) {
      addNotification(
        currentChat.participantId,
        "New Direct Message",
        `💬 ${user.name} sent you a message`,
        'message'
      );
    }
  };

  const activeChat = chats.find(c => c.id === activeChatId);
  const filteredChats = chats.filter(c => c.participant.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const formatTime = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!user) return null;

  return (
    <div ref={widgetRef}>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-theme-primary text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-[60] ${isOpen ? 'scale-90 hover:bg-[#e67363]' : 'hover:scale-105'}`}
      >
        {isOpen ? <ChevronDown size={24} /> : <MessageSquare size={24} />}
        {/* Optional unread badge can go here */}
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] md:w-[800px] h-[600px] max-h-[75vh] bg-theme-card rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden z-50 animate-in slide-in-from-bottom-8 fade-in duration-300 border border-theme-border">
          
          {/* Left Sidebar (Conversations) */}
          <div className={`w-full md:w-1/3 bg-theme-bg/50 flex-col border-r border-theme-border ${activeChatId ? 'hidden md:flex' : 'flex'} h-full`}>
            
            <div className="p-4 border-b border-theme-border bg-theme-card">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-theme-primary">Messages</h3>
                <div className="flex items-center gap-1">
                  <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-theme-primary bg-gray-100 hover:bg-theme-border/30 p-1.5 rounded-md transition-colors" title="Minimize">
                    <Minus size={16} />
                  </button>
                  <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-theme-primary bg-gray-100 hover:bg-theme-border/30 p-1.5 rounded-md transition-colors" title="Close">
                    <X size={16} />
                  </button>
                </div>
              </div>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search chats..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-theme-bg border border-theme-border rounded-lg text-sm focus:outline-none focus:border-theme-accent"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {filteredChats.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-sm mt-4">No conversations found.</div>
              ) : (
                filteredChats.map(chat => {
                  const lastMessage = chat.messages[chat.messages.length - 1];
                  return (
                    <div 
                      key={chat.id} 
                      onClick={() => setActiveChatId(chat.id)}
                      className={`p-4 border-b border-theme-border cursor-pointer hover:bg-theme-card transition-colors flex items-center gap-3 ${activeChatId === chat.id ? 'bg-theme-card border-l-4 border-l-theme-accent' : 'border-l-4 border-l-transparent'}`}
                    >
                      <div className="relative shrink-0">
                        <div className="w-10 h-10 rounded-full bg-theme-primary text-white flex items-center justify-center font-bold text-sm overflow-hidden border border-theme-border">
                          {chat.participant.avatarBase64 ? (
                            <img src={chat.participant.avatarBase64} alt="Avatar" className="w-full h-full object-cover" />
                          ) : (
                            getInitials(chat.participant.name)
                          )}
                        </div>
                        {chat.participant.isAvailable && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="font-bold text-theme-primary text-sm truncate">{chat.participant.name}</h4>
                          {lastMessage && <span className="text-xs text-gray-400 shrink-0">{formatTime(lastMessage.timestamp)}</span>}
                        </div>
                        <p className="text-xs text-gray-500 truncate">{lastMessage?.text || 'No messages yet.'}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Main Area (Active Chat) */}
          <div className={`w-full md:w-2/3 flex-col bg-theme-bg/20 ${!activeChatId ? 'hidden md:flex' : 'flex'} h-full relative`}>
            
            {activeChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 bg-theme-card border-b border-theme-border flex justify-between items-center shrink-0 shadow-sm z-10">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setActiveChatId(null)}
                      className="md:hidden text-gray-500 hover:text-theme-primary"
                    >
                      &larr;
                    </button>
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-theme-primary text-white flex items-center justify-center font-bold text-sm overflow-hidden border border-theme-border">
                        {activeChat.participant.avatarBase64 ? (
                          <img src={activeChat.participant.avatarBase64} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          getInitials(activeChat.participant.name)
                        )}
                      </div>
                      {activeChat.participant.isAvailable && (
                         <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-theme-primary leading-tight">{activeChat.participant.name}</h3>
                      <span className="text-xs text-theme-accent font-semibold">{activeChat.participant.role}</span>
                    </div>
                  </div>
                  
                  <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-theme-primary bg-gray-100 hover:bg-theme-border/30 p-2 rounded-full transition-colors">
                    <X size={18} />
                  </button>
                </div>

                {/* Messages Feed */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {activeChat.messages.map((msg, idx) => {
                    const isMe = msg.senderId === user?.email;
                    return (
                      <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] sm:max-w-[75%] px-4 py-2 rounded-2xl ${isMe ? 'bg-theme-primary text-white rounded-br-none' : 'bg-theme-card border border-theme-border text-theme-primary rounded-bl-none shadow-sm'}`}>
                          <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
                          <div className={`text-[10px] mt-1 text-right ${isMe ? 'text-white/80' : 'text-gray-400'}`}>
                            {formatTime(msg.timestamp)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-theme-card border-t border-theme-border shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input 
                      type="text" 
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 bg-theme-bg border border-theme-border rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-theme-accent text-theme-primary"
                    />
                    <button 
                      type="submit"
                      disabled={!messageInput.trim()}
                      className="w-10 h-10 rounded-full bg-theme-primary text-white flex items-center justify-center shrink-0 disabled:opacity-50 hover:opacity-90 transition-opacity"
                    >
                      <Send size={18} className="ml-1" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center relative">
                <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-theme-primary bg-theme-card shadow-sm hover:bg-gray-100 p-2 rounded-full transition-colors md:hidden">
                  <X size={18} />
                </button>
                <div className="text-center">
                  <div className="w-16 h-16 bg-theme-card rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-theme-border text-theme-accent">
                    <MessageSquare size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-theme-primary mb-2">Your Messages</h3>
                  <p className="text-gray-500 text-sm max-w-[250px] mx-auto">Select a conversation from the sidebar to start chatting.</p>
                </div>
              </div>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
