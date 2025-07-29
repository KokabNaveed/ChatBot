import React from 'react';
import { SAMPLE_QUESTIONS } from '../config/questions';

interface QuestionSuggestionsProps {
  onSelectQuestion: (question: string) => void;
}

export const QuestionSuggestions: React.FC<QuestionSuggestionsProps> = ({ onSelectQuestion }) => (
  <div className="p-4 bg-gray-50 rounded-lg mb-4">
    <h2 className="text-lg font-semibold mb-3 text-gray-700">آپ یہ سوالات پوچھ سکتے ہیں:</h2>
    
    <div className="space-y-4">
      {Object.entries(SAMPLE_QUESTIONS).map(([category, questions]) => (
        <div key={category} className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {questions.map((question, index) => (
              <button
                key={index}
                onClick={() => onSelectQuestion(question)}
                className="bg-white px-3 py-2 rounded-full text-sm border border-blue-200 hover:bg-blue-50 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);