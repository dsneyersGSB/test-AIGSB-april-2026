'use client';

import { useState } from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function JobDescriptionInput({ value, onChange }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <div>
          <span className="text-sm font-medium text-gray-700">
            Customize for a specific role
          </span>
          {value && !expanded && (
            <span className="ml-2 text-xs text-indigo-600">(Job description added)</span>
          )}
        </div>
        <svg
          className={`h-5 w-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {expanded && (
        <div className="border-t border-gray-100 px-4 pb-4 pt-3">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste a job description or key requirements here to get tailored interview questions..."
            rows={5}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      )}
    </div>
  );
}
