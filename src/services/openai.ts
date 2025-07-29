import OpenAI from 'openai';
import { OPENAI_CONFIG } from '../config/openai';
import type { Message } from '../types/chat';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateResponse = async (messages: Message[]) => {
  try {
    const completion = await openai.chat.completions.create({
      model: OPENAI_CONFIG.model,
      messages: [
        {
          role: "system",
          content: OPENAI_CONFIG.systemPrompt
        },
        ...messages
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('چیٹ بوٹ سے رابطہ کرنے میں مسئلہ ہے۔ براہ کرم دوبارہ کوشش کریں۔');
  }
};