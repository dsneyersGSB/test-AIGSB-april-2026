'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { InterviewResult } from '@/lib/types';
import FeedbackPanel from '@/components/FeedbackPanel';

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<InterviewResult | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('interviewResult');
      if (stored) {
        setResult(JSON.parse(stored));
      } else {
        router.push('/practice');
      }
    } catch {
      router.push('/practice');
    }
  }, [router]);

  if (!result) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Feedback</h1>
        <p className="mt-1 text-sm text-gray-500">
          Here&apos;s how your answer was evaluated by AI.
        </p>
      </div>

      <FeedbackPanel result={result} />

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/practice"
          className="flex-1 rounded-lg bg-indigo-600 px-6 py-3 text-center text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
        >
          Practice Another Question
        </Link>
        <Link
          href="/settings"
          className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 text-center text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
        >
          Adjust Your Profile
        </Link>
      </div>
    </div>
  );
}
