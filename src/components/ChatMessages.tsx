import React from 'react';
import { Bot } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import type { Message } from '../types/chat';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading, error }) => (
  <div className="h-[600px] overflow-y-auto p-4 space-y-4">
    {messages.length === 0 ? (
      <div className="text-center text-gray-500 mt-8">
        <Bot className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p>!گفتگو شروع کرنے کے لیے پیغام بھیجیں</p>
      </div>
    ) : (
      messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))
    )}
    {isLoading && (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )}
    {error && (
      <div className="text-red-500 text-center p-2">{error}</div>
    )}
  </div>
);