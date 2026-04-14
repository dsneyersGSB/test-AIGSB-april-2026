'use client';

import { useState } from 'react';
import { InterviewResult } from '@/lib/types';

function ScoreBadge({ score }: { score: number }) {
  let color = 'from-red-500 to-red-600';
  if (score >= 7) color = 'from-green-500 to-green-600';
  else if (score >= 4) color = 'from-yellow-500 to-amber-500';

  return (
    <div className={`inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${color} text-white shadow-lg`}>
      <div className="text-center">
        <div className="text-2xl font-bold">{score}</div>
        <div className="text-[10px] uppercase tracking-wider opacity-80">/ 10</div>
      </div>
    </div>
  );
}

function StarSection({ label, feedback }: { label: string; feedback: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3 text-left"
      >
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <svg
          className={`h-4 w-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && <p className="pb-3 text-sm text-gray-600 leading-relaxed">{feedback}</p>}
    </div>
  );
}

export default function FeedbackPanel({ result }: { result: InterviewResult }) {
  const [showSample, setShowSample] = useState(false);
  const { feedback, question, answer } = result;

  return (
    <div className="space-y-6">
      {/* Score */}
      <div className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <ScoreBadge score={feedback.overallScore} />
        <p className="text-sm text-gray-500">
          {feedback.overallScore >= 8
            ? 'Excellent answer!'
            : feedback.overallScore >= 6
            ? 'Good answer with room to improve'
            : feedback.overallScore >= 4
            ? 'Decent start, but needs more depth'
            : 'Needs significant improvement'}
        </p>
      </div>

      {/* Original Question */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-2 text-sm font-medium text-gray-500">Question</h3>
        <p className="text-sm text-gray-800">{question.question}</p>
      </div>

      {/* User's Answer */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
        <h3 className="mb-2 text-sm font-medium text-gray-500">Your Answer</h3>
        <p className="whitespace-pre-wrap text-sm text-gray-700">{answer}</p>
      </div>

      {/* Strengths */}
      <div className="rounded-xl border-l-4 border-green-500 bg-white p-6 shadow-sm">
        <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-green-800">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Strengths
        </h3>
        <ul className="space-y-2">
          {feedback.strengths.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-0.5 text-green-500">&#10003;</span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Improvements */}
      <div className="rounded-xl border-l-4 border-amber-500 bg-white p-6 shadow-sm">
        <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-amber-800">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          Areas for Improvement
        </h3>
        <ul className="space-y-2">
          {feedback.improvements.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-0.5 text-amber-500">&#8594;</span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* STAR Evaluation */}
      {feedback.starEvaluation && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-base font-semibold text-gray-900">STAR Framework Evaluation</h3>
          <div className="divide-y divide-gray-100">
            <StarSection label="Situation" feedback={feedback.starEvaluation.situation} />
            <StarSection label="Task" feedback={feedback.starEvaluation.task} />
            <StarSection label="Action" feedback={feedback.starEvaluation.action} />
            <StarSection label="Result" feedback={feedback.starEvaluation.result} />
          </div>
        </div>
      )}

      {/* Sample Answer */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <button
          type="button"
          onClick={() => setShowSample(!showSample)}
          className="flex w-full items-center justify-between p-6 text-left"
        >
          <h3 className="text-base font-semibold text-gray-900">Sample Answer</h3>
          <span className="text-sm text-indigo-600">{showSample ? 'Hide' : 'Show'}</span>
        </button>
        {showSample && (
          <div className="border-t border-gray-100 px-6 pb-6">
            <p className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
              {feedback.sampleAnswer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
