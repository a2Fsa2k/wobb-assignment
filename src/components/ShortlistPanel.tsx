import { useShortlistStore } from "@/store/shortlistStore";
import { useUIStore } from "@/store/uiStore";
import { X, Trash2, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ShortlistPanel() {
  const { shortlisted, removeFromShortlist, clearShortlist } =
    useShortlistStore();
  const shortlistOpen = useUIStore((s) => s.shortlistOpen);
  const setShortlistOpen = useUIStore((s) => s.setShortlistOpen);
  const navigate = useNavigate();

  if (!shortlistOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 dark:bg-black/60 z-40 lg:hidden"
        onClick={() => setShortlistOpen(false)}
      />
      <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 z-50 flex flex-col shadow-xl animate-slide-in">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Shortlist</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {shortlisted.length} profile{shortlisted.length !== 1 ? "s" : ""}{" "}
              selected
            </p>
          </div>
          <button
            onClick={() => setShortlistOpen(false)}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500"
            aria-label="Close shortlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {shortlisted.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-slate-400 dark:text-slate-500">
            <User className="w-10 h-10 mb-2 opacity-50" />
            <p className="text-sm font-medium">No profiles shortlisted</p>
            <p className="text-xs mt-1 text-center">
              Click "Add" on any profile to start building your list
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {shortlisted.map((profile) => (
                <div
                  key={profile.user_id}
                  className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  onClick={() => {
                    navigate(
                      `/profile/${profile.username}?platform=instagram`
                    );
                    setShortlistOpen(false);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter")
                      navigate(
                        `/profile/${profile.username}?platform=instagram`
                      );
                  }}
                >
                  <img
                    src={profile.picture}
                    alt={profile.username}
                    className="w-9 h-9 rounded-full object-cover bg-slate-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"><rect fill="#e2e8f0" width="36" height="36"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="#94a3b8" font-size="16" font-family="system-ui">${(profile.username || "?")[0].toUpperCase()}</text></svg>`)}`;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      @{profile.username}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {profile.fullname}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromShortlist(profile.user_id);
                    }}
                    className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    aria-label={`Remove ${profile.username}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={clearShortlist}
                className="flex items-center justify-center gap-2 w-full py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear all
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
