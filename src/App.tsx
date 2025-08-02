import React from 'react';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessages } from './components/ChatMessages';
import { ChatInput } from './components/ChatInput';
import { QuestionSuggestions } from './components/QuestionSuggestions';
import { useChat } from './hooks/useChat';

export function App() {
  const { messages, isLoading, error, sendMessage } = useChat();

  return (
    <div className="min-h-screen bg-gray-100 p-4" dir="rtl">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <ChatHeader />
        {messages.length === 0 && (
          <QuestionSuggestions onSelectQuestion={sendMessage} />
        )}
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          error={error}
        />
        <div className="border-t p-4">
          <ChatInput
            onSendMessage={sendMessage}
            disabled={isLoading}
            placeholder="اپنا پیغام ٹائپ کریں..."
          />
        </div>
      </div>
    </div>
  );
}