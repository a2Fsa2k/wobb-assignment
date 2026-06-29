import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useShortlistStore } from "@/store/shortlistStore";
import { useUIStore } from "@/store/uiStore";
import { List, X } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const shortlisted = useShortlistStore((s) => s.shortlisted);
  const toggleShortlist = useUIStore((s) => s.toggleShortlist);
  const shortlistOpen = useUIStore((s) => s.shortlistOpen);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold text-slate-900 hover:text-indigo-600 transition-colors"
          >
            Wobb
          </Link>

          <div className="flex items-center gap-4">
            {title && (
              <span className="text-sm text-slate-500 hidden sm:block">
                {title}
              </span>
            )}
            <button
              onClick={toggleShortlist}
              className="relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label={`Shortlist (${shortlisted.length} profiles)`}
            >
              {shortlistOpen ? (
                <X className="w-5 h-5 text-slate-600" />
              ) : (
                <List className="w-5 h-5 text-slate-600" />
              )}
              <span className="text-sm font-medium text-slate-700">
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
    </div>
  );
}
