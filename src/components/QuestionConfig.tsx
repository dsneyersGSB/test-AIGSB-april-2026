'use client';

import { QuestionCategory, Difficulty, AnswerMode } from '@/lib/types';

interface Props {
  category: QuestionCategory;
  setCategory: (c: QuestionCategory) => void;
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  answerMode: AnswerMode;
  setAnswerMode: (m: AnswerMode) => void;
}

function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
      <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
              value === opt.value
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function QuestionConfig({
  category,
  setCategory,
  difficulty,
  setDifficulty,
  answerMode,
  setAnswerMode,
}: Props) {
  return (
    <div className="space-y-6">
      <SegmentedControl
        label="Question Type"
        options={[
          { value: 'behavioral' as QuestionCategory, label: 'Behavioral (STAR)' },
          { value: 'case' as QuestionCategory, label: 'Case Study' },
          { value: 'situational' as QuestionCategory, label: 'Situational' },
        ]}
        value={category}
        onChange={setCategory}
      />

      <SegmentedControl
        label="Difficulty"
        options={[
          { value: 'easy' as Difficulty, label: 'Easy' },
          { value: 'medium' as Difficulty, label: 'Medium' },
          { value: 'hard' as Difficulty, label: 'Hard' },
        ]}
        value={difficulty}
        onChange={setDifficulty}
      />

      <SegmentedControl
        label="Answer Format"
        options={[
          { value: 'freeform' as AnswerMode, label: 'Free-form' },
          { value: 'multiple-choice' as AnswerMode, label: 'Multiple Choice' },
        ]}
        value={answerMode}
        onChange={setAnswerMode}
      />
    </div>
  );
}
