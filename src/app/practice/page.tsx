'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  QuestionCategory,
  Difficulty,
  AnswerMode,
  GeneratedQuestion,
  InterviewResult,
} from '@/lib/types';
import { useUserProfile } from '@/hooks/useUserProfile';
import QuestionConfig from '@/components/QuestionConfig';
import JobDescriptionInput from '@/components/JobDescriptionInput';
import QuestionCard from '@/components/QuestionCard';
import AnswerInput from '@/components/AnswerInput';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function PracticePage() {
  const router = useRouter();
  const [profile] = useUserProfile();

  const [category, setCategory] = useState<QuestionCategory>('behavioral');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [answerMode, setAnswerMode] = useState<AnswerMode>('freeform');
  const [jobDescription, setJobDescription] = useState('');

  const [currentQuestion, setCurrentQuestion] = useState<GeneratedQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    try {
      const res = await fetch('/api/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          difficulty,
          answerMode,
          jobDescription: jobDescription || undefined,
          userProfile: profile || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate question');
      const question: GeneratedQuestion = data;
      setCurrentQuestion(question);
      setUserAnswer('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate question. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async () => {
    if (!currentQuestion || !userAnswer.trim()) return;
    setIsEvaluating(true);
    setError('');
    try {
      const res = await fetch('/api/evaluate-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestion,
          answer: userAnswer,
          answerMode,
          userProfile: profile || undefined,
          jobDescription: jobDescription || undefined,
        }),
      });
      if (!res.ok) throw new Error('Failed to evaluate answer');
      const feedback = await res.json();
      const result: InterviewResult = {
        question: currentQuestion,
        answer: userAnswer,
        answerMode,
        feedback,
      };
      sessionStorage.setItem('interviewResult', JSON.stringify(result));
      router.push('/results');
    } catch {
      setError('Failed to evaluate your answer. Please try again.');
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNewQuestion = () => {
    setCurrentQuestion(null);
    setUserAnswer('');
    setError('');
  };

  if (isGenerating) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <LoadingSpinner message="Generating your interview question..." />
      </div>
    );
  }

  if (isEvaluating) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <LoadingSpinner message="Analyzing your answer..." />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      {!currentQuestion ? (
        <>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Practice Setup</h1>
            <p className="mt-1 text-sm text-gray-500">
              Configure your interview question preferences.
              {profile && (
                <span className="text-indigo-600"> Personalized for {profile.industry}.</span>
              )}
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <QuestionConfig
                category={category}
                setCategory={setCategory}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                answerMode={answerMode}
                setAnswerMode={setAnswerMode}
              />
            </div>

            <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="button"
              onClick={handleGenerate}
              className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Generate Question
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Your Question</h1>
            <button
              type="button"
              onClick={handleNewQuestion}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              New Question
            </button>
          </div>

          <div className="space-y-6">
            <QuestionCard question={currentQuestion} />

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <AnswerInput
                answerMode={answerMode}
                options={currentQuestion.options}
                value={userAnswer}
                onChange={setUserAnswer}
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!userAnswer.trim()}
              className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Submit Answer
            </button>
          </div>
        </>
      )}
    </div>
  );
}
