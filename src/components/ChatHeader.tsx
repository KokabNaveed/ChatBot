import React from 'react';
import { Bot } from 'lucide-react';

export const ChatHeader: React.FC = () => (
  <div className="bg-blue-500 p-4 flex items-center gap-3">
    <Bot className="w-8 h-8 text-white" />
    <h1 className="text-xl font-bold text-white">پنجاب پولیس خدمت مرکز چیٹ بوٹ</h1>
  </div>
);