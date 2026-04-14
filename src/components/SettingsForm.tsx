'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '@/lib/types';
import { useUserProfile } from '@/hooks/useUserProfile';

export default function SettingsForm() {
  const [profile, setProfile] = useUserProfile();
  const [industry, setIndustry] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Mid-career');
  const [careerGoals, setCareerGoals] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) {
      setIndustry(profile.industry);
      setExperienceLevel(profile.experienceLevel);
      setCareerGoals(profile.careerGoals);
    }
  }, [profile]);

  const handleSave = () => {
    const newProfile: UserProfile = { industry, experienceLevel, careerGoals };
    setProfile(newProfile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="industry" className="mb-1 block text-sm font-medium text-gray-700">
          Industry
        </label>
        <input
          id="industry"
          type="text"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="e.g., Technology, Consulting, Finance, Healthcare"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="experience" className="mb-1 block text-sm font-medium text-gray-700">
          Experience Level
        </label>
        <select
          id="experience"
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option>Entry-level</option>
          <option>Mid-career</option>
          <option>Senior</option>
          <option>Executive</option>
        </select>
      </div>

      <div>
        <label htmlFor="goals" className="mb-1 block text-sm font-medium text-gray-700">
          Career Goals
        </label>
        <textarea
          id="goals"
          value={careerGoals}
          onChange={(e) => setCareerGoals(e.target.value)}
          placeholder="e.g., Transition to product management, prepare for FAANG interviews, move into a leadership role..."
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save Profile
        </button>
        {saved && (
          <span className="text-sm font-medium text-green-600 animate-pulse">
            Profile saved!
          </span>
        )}
      </div>
    </div>
  );
}
