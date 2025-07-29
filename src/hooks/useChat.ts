import { useState } from 'react';
import type { Message, ChatState } from '../types/chat';
import { generateResponse } from '../services/openai';

export const useChat = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const sendMessage = async (content: string) => {
    const userMessage: Message = { role: 'user', content };
    
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const response = await generateResponse([...chatState.messages, userMessage]);
      const assistantMessage: Message = { role: 'assistant', content: response };
      
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: 'چیٹ بوٹ سے رابطہ کرنے میں مسئلہ ہے۔ براہ کرم دوبارہ کوشش کریں۔',
      }));
    }
  };

  return {
    messages: chatState.messages,
    isLoading: chatState.isLoading,
    error: chatState.error,
    sendMessage,
  };
};