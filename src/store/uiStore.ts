import { create } from "zustand";

interface UIState {
  shortlistOpen: boolean;
  toggleShortlist: () => void;
  setShortlistOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  shortlistOpen: false,
  toggleShortlist: () => set((s) => ({ shortlistOpen: !s.shortlistOpen })),
  setShortlistOpen: (open) => set({ shortlistOpen: open }),
}));
