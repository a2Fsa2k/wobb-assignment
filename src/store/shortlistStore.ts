import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfileSummary } from "@/types";

interface ShortlistState {
  shortlisted: UserProfileSummary[];
  addToShortlist: (profile: UserProfileSummary) => void;
  removeFromShortlist: (userId: string) => void;
  isShortlisted: (userId: string) => boolean;
  clearShortlist: () => void;
}

export const useShortlistStore = create<ShortlistState>()(
  persist(
    (set, get) => ({
      shortlisted: [],
      addToShortlist: (profile) => {
        const exists = get().shortlisted.some(
          (p) => p.user_id === profile.user_id
        );
        if (exists) return;
        set((state) => ({ shortlisted: [...state.shortlisted, profile] }));
      },
      removeFromShortlist: (userId) => {
        set((state) => ({
          shortlisted: state.shortlisted.filter((p) => p.user_id !== userId),
        }));
      },
      isShortlisted: (userId) => {
        return get().shortlisted.some((p) => p.user_id === userId);
      },
      clearShortlist: () => set({ shortlisted: [] }),
    }),
    { name: "wobb-shortlist" }
  )
);
