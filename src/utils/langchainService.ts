import { OpenAI } from 'langchain/llms/openai';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { queryWebsiteData } from './websiteData';

const model = new OpenAI({
  openAIApiKey: process.env.VITE_OPENAI_API_KEY,
  temperature: 0.7,
  modelName: 'gpt-3.5-turbo'
});

export async function generateResponse(messages: { role: string; content: string }[]) {
  try {
    // Get relevant context from website data
    const lastMessage = messages[messages.length - 1].content;
    const context = await queryWebsiteData(lastMessage);

    // Create conversation history
    const history = messages.slice(0, -1).map(msg => ({
      human: msg.role === 'user' ? msg.content : '',
      ai: msg.role === 'assistant' ? msg.content : ''
    }));

    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      async (query: string) => context || []
    );

    const response = await chain.call({
      question: lastMessage,
      chat_history: history
    });

    return response.text;
  } catch (error) {
    console.error('Langchain Error:', error);
    throw new Error('چیٹ بوٹ سے رابطہ کرنے میں مسئلہ ہے۔ براہ کرم دوبارہ کوشش کریں۔');
  }
}