import { GeneratedQuestion } from '@/lib/types';

const categoryColors: Record<string, string> = {
  behavioral: 'bg-purple-100 text-purple-700',
  case: 'bg-blue-100 text-blue-700',
  situational: 'bg-amber-100 text-amber-700',
};

const categoryLabels: Record<string, string> = {
  behavioral: 'Behavioral (STAR)',
  case: 'Case Study',
  situational: 'Situational',
};

const difficultyColors: Record<string, string> = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  hard: 'bg-red-100 text-red-700',
};

export default function QuestionCard({ question }: { question: GeneratedQuestion }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${categoryColors[question.category]}`}>
          {categoryLabels[question.category]}
        </span>
        <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${difficultyColors[question.difficulty]}`}>
          {question.difficulty}
        </span>
      </div>
      <p className="text-lg font-medium text-gray-900 leading-relaxed">{question.question}</p>
      {question.context && (
        <div className="mt-4 rounded-lg bg-gray-50 p-4">
          <p className="text-sm font-medium text-gray-500 mb-1">Context</p>
          <p className="text-sm text-gray-700 leading-relaxed">{question.context}</p>
        </div>
      )}
    </div>
  );
}
