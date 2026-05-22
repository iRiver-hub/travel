import { create } from 'zustand';
import type { TravelPreferences, TravelPlan } from '@/types/travel';

interface TravelState {
  preferences: TravelPreferences | null;
  plan: TravelPlan | null;
  isAdjusting: boolean;
  setPreferences: (prefs: TravelPreferences) => void;
  setPlan: (plan: TravelPlan) => void;
  setIsAdjusting: (adjusting: boolean) => void;
  reset: () => void;
}

export const useTravelStore = create<TravelState>((set) => ({
  preferences: null,
  plan: null,
  isAdjusting: false,
  setPreferences: (prefs) => set({ preferences: prefs }),
  setPlan: (plan) => set({ plan }),
  setIsAdjusting: (adjusting) => set({ isAdjusting: adjusting }),
  reset: () => set({ preferences: null, plan: null, isAdjusting: false }),
}));
