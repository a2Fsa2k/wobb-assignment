import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolved: () => "light" | "dark";
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "system",
      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },
      resolved: () => {
        const t = get().theme;
        if (t === "system") {
          return globalThis.matchMedia?.("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        }
        return t;
      },
    }),
    { name: "wobb-theme" }
  )
);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const resolved =
    theme === "system"
      ? globalThis.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  root.classList.toggle("dark", resolved === "dark");
}

// Apply on load
if (typeof window !== "undefined") {
  const stored = (() => {
    try {
      return JSON.parse(localStorage.getItem("wobb-theme") || "{}");
    } catch {
      return {};
    }
  })();
  applyTheme(stored.state?.theme || "system");
}
