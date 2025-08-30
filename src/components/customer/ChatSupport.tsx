'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2,
  Clock,
  CheckCircle
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'ai' | 'system';
  type?: 'text' | 'quick_reply' | 'card';
  metadata?: {
    quickReplies?: string[];
    cardTitle?: string;
    cardActions?: Array<{ label: string; action: string }>;
  };
}

interface ChatSupportProps {
  userId?: string;
  caseId?: string;
  className?: string;
}

const MOCK_RESPONSES = {
  greeting: {
    content: "Hi there! I'm your AI support assistant. I can help you with questions about your case status, account information, or general platform guidance. How can I assist you today?",
    quickReplies: ["Check case status", "Account questions", "Technical support", "Billing inquiry"]
  },
  case_status: {
    content: "I can help you check your case status. Let me look that up for you...",
    delay: 2000,
    followUp: "Your case #SO-2025-001 is currently under review by Dr. Sarah Chen (Cardiology). Expected completion: 24-48 hours. Would you like me to send you a notification when it's ready?"
  },
  account_info: {
    content: "I can help with account-related questions including profile updates, password resets, and notification preferences. What specifically would you like help with?",
    quickReplies: ["Update profile", "Password reset", "Notification settings", "Delete account"]
  },
  technical_support: {
    content: "I'm here to help with any technical issues. Common problems I can assist with include file upload issues, login problems, and website navigation. What are you experiencing?",
    quickReplies: ["Upload problems", "Login issues", "Site not loading", "Other technical issue"]
  },
  billing: {
    content: "For billing questions, I can help with payment history, refund requests, and subscription management. What billing question do you have?",
    quickReplies: ["Payment history", "Refund request", "Update payment method", "Cancel subscription"]
  }
};

export default function ChatSupport({ userId, caseId, className = '' }: ChatSupportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setUnreadCount(0);
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const addMessage = (content: string, sender: 'user' | 'ai' | 'system', metadata?: Message['metadata']) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      timestamp: new Date(),
      sender,
      metadata
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    if (!isOpen || isMinimized) {
      setUnreadCount(prev => prev + 1);
    }
  };

  const generateAIResponse = async (userInput: string) => {
    setIsTyping(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const input = userInput.toLowerCase();
    let response = MOCK_RESPONSES.greeting;
    
    if (input.includes('case') || input.includes('status') || input.includes('progress')) {
      response = MOCK_RESPONSES.case_status;
    } else if (input.includes('account') || input.includes('profile') || input.includes('password')) {
      response = MOCK_RESPONSES.account_info;
    } else if (input.includes('technical') || input.includes('upload') || input.includes('login') || input.includes('problem')) {
      response = MOCK_RESPONSES.technical_support;
    } else if (input.includes('billing') || input.includes('payment') || input.includes('refund') || input.includes('subscription')) {
      response = MOCK_RESPONSES.billing;
    } else if (input.includes('hello') || input.includes('hi') || input.includes('help')) {
      response = MOCK_RESPONSES.greeting;
    } else {
      // Default contextual response
      response = {
        content: `I understand you're asking about "${userInput}". While I can provide general guidance, for specific medical questions or complex issues, I'd recommend contacting our human support team. Is there something else I can help you with?`,
        quickReplies: ["Contact human support", "Check case status", "Account questions", "Technical support"]
      };
    }
    
    setIsTyping(false);
    addMessage(response.content, 'ai', { quickReplies: response.quickReplies });
    
    // Handle follow-up messages
    if ('followUp' in response && response.followUp) {
      setTimeout(() => {
        addMessage(response.followUp!, 'ai');
      }, response.delay || 3000);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue.trim();
    setInputValue('');
    
    addMessage(userMessage, 'user');
    await generateAIResponse(userMessage);
  };

  const handleQuickReply = (reply: string) => {
    addMessage(reply, 'user');
    generateAIResponse(reply);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const initializeChat = () => {
    if (messages.length === 0) {
      setTimeout(() => {
        addMessage(
          "Hi! I'm your AI support assistant. I can help you with case updates, account questions, or technical support. How can I help you today?",
          'ai',
          { quickReplies: ["Check case status", "Account questions", "Technical support", "Billing inquiry"] }
        );
      }, 500);
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const chatButton = (
    <button
      onClick={() => {
        setIsOpen(true);
        initializeChat();
      }}
      className={`
        fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 
        text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 
        hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300
        ${className}
      `}
      aria-label="Open chat support"
    >
      <MessageCircle className="w-6 h-6" />
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );

  if (!isOpen) {
    return chatButton;
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <div className={`
        bg-white rounded-lg shadow-2xl border border-gray-200 transition-all duration-300 
        ${isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'} max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)]
      `}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">AI Support Assistant</h3>
              <div className="flex items-center space-x-1 text-xs opacity-90">
                <CheckCircle className="w-3 h-3" />
                <span>Online</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              aria-label={isMinimized ? "Maximize" : "Minimize"}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-xs lg:max-w-sm">
                    <div className={`
                      flex items-start space-x-2 
                      ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}
                    `}>
                      <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center text-xs
                        ${message.sender === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-600'
                        }
                      `}>
                        {message.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                      </div>
                      
                      <div className={`
                        px-3 py-2 rounded-2xl text-sm
                        ${message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                        }
                      `}>
                        {message.content}
                        
                        {message.metadata?.quickReplies && (
                          <div className="mt-2 space-y-1">
                            {message.metadata.quickReplies.map((reply, index) => (
                              <button
                                key={index}
                                onClick={() => handleQuickReply(reply)}
                                className="block w-full text-left px-2 py-1 text-xs bg-white bg-opacity-20 hover:bg-opacity-30 rounded transition-colors"
                              >
                                {reply}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className={`
                      text-xs text-gray-500 mt-1 flex items-center space-x-1
                      ${message.sender === 'user' ? 'justify-end' : 'justify-start'}
                    `}>
                      <Clock className="w-3 h-3" />
                      <span>{formatTime(message.timestamp)}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-xs lg:max-w-sm">
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs">
                        <Bot className="w-3 h-3 text-gray-600" />
                      </div>
                      <div className="bg-gray-100 px-3 py-2 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className={`
                    p-2 rounded-lg transition-colors
                    ${inputValue.trim() && !isTyping
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              <div className="mt-2 text-xs text-gray-500 text-center">
                AI responses are for general guidance only. For urgent matters, contact human support.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}