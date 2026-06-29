import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useShortlistStore } from "@/store/shortlistStore";
import { useUIStore } from "@/store/uiStore";
import { useThemeStore } from "@/store/themeStore";
import { useToastStore } from "@/store/toastStore";
import { ToastContainer } from "@/components/ToastContainer";
import { List, X, Moon, Sun, Monitor } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const shortlisted = useShortlistStore((s) => s.shortlisted);
  const toggleShortlist = useUIStore((s) => s.toggleShortlist);
  const shortlistOpen = useUIStore((s) => s.shortlistOpen);
  const { theme, setTheme } = useThemeStore();

  const cycleTheme = () => {
    const order: Array<"light" | "dark" | "system"> = [
      "light",
      "dark",
      "system",
    ];
    const idx = order.indexOf(theme);
    setTheme(order[(idx + 1) % order.length]);
  };

  const ThemeIcon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Wobb
          </Link>

          <div className="flex items-center gap-2">
            {title && (
              <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">
                {title}
              </span>
            )}
            <button
              onClick={cycleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
              aria-label={`Theme: ${theme}`}
              title={`Theme: ${theme}`}
            >
              <ThemeIcon className="w-4 h-4" />
            </button>
            <button
              onClick={toggleShortlist}
              className="relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label={`Shortlist (${shortlisted.length} profiles)`}
            >
              {shortlistOpen ? (
                <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              ) : (
                <List className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              )}
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Shortlist
              </span>
              {shortlisted.length > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-indigo-600 rounded-full">
                  {shortlisted.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>

      <ToastContainer toasts={useToastStore((s) => s.toasts)} />
    </div>
  );
}
