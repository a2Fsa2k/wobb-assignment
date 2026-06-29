import { create } from "zustand";
import type { Platform } from "@/types";

interface SearchState {
  platform: Platform;
  searchQuery: string;
  setPlatform: (platform: Platform) => void;
  setSearchQuery: (query: string) => void;
}

export const useSearchStore = create<SearchState>()((set) => ({
  platform: "instagram",
  searchQuery: "",
  setPlatform: (platform) => set({ platform, searchQuery: "" }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
