import React from 'react';
import { MessageCircle, Bot } from 'lucide-react';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`p-2 rounded-full ${isUser ? 'bg-blue-500' : 'bg-gray-200'}`}>
        {isUser ? (
          <MessageCircle className="w-6 h-6 text-white" />
        ) : (
          <Bot className="w-6 h-6 text-gray-700" />
        )}
      </div>
      <div
        className={`max-w-[80%] p-4 rounded-lg ${isUser
            ? 'bg-blue-500 text-white rounded-tr-none'
            : 'bg-gray-100 text-gray-800 rounded-tl-none'
          }`}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
};