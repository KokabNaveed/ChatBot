import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateResponse = async (messages: { role: 'user' | 'assistant', content: string }[]) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for Punjab Police Khidmat Markaz. Always respond in Urdu language. Only provide information related to Punjab Police services and Khidmat Markaz. If a question is outside this scope, politely explain in Urdu that you can only answer questions about Punjab Police services."
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