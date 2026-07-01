import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolved: () => "light" | "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const resolved =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  root.classList.toggle("dark", resolved === "dark");
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "system",
      setTheme: (theme: Theme) => {
        set({ theme });
        applyTheme(theme);
      },
      resolved: () => {
        const t = get().theme;
        if (t === "system") {
          return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        }
        return t;
      },
    }),
    {
      name: "wobb-theme",
      onRehydrateStorage: () => (state) => {
        applyTheme(state?.theme ?? "system");
      },
    }
  )
);

// Listen for system theme changes
if (typeof window !== "undefined") {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const { theme } = useThemeStore.getState();
      if (theme === "system") {
        applyTheme("system");
      }
    });
}
