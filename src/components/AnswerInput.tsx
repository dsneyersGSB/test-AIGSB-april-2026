'use client';

import { AnswerMode } from '@/lib/types';

interface Props {
  answerMode: AnswerMode;
  options: string[] | null;
  value: string;
  onChange: (v: string) => void;
}

export default function AnswerInput({ answerMode, options, value, onChange }: Props) {
  if (answerMode === 'multiple-choice' && options) {
    return (
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Select your answer</label>
        {options.map((option, i) => {
          const letter = String.fromCharCode(65 + i);
          const isSelected = value === option;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onChange(option)}
              className={`flex w-full items-start gap-3 rounded-lg border-2 p-4 text-left transition-all ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                  isSelected
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {letter}
              </span>
              <span className={`text-sm leading-relaxed ${isSelected ? 'text-indigo-900' : 'text-gray-700'}`}>
                {option}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Your Answer
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your answer here. For behavioral questions, try to use the STAR framework: describe the Situation, Task, Action, and Result..."
        rows={8}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />
      <p className="mt-1 text-right text-xs text-gray-400">{value.length} characters</p>
    </div>
  );
}
