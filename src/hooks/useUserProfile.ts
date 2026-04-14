'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '@/lib/types';

const STORAGE_KEY = 'interviewSimProfile';

export function useUserProfile(): [UserProfile | null, (profile: UserProfile) => void] {
  const [profile, setProfileState] = useState<UserProfile | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProfileState(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const setProfile = (newProfile: UserProfile) => {
    setProfileState(newProfile);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
    } catch {}
  };

  return [profile, setProfile];
}
