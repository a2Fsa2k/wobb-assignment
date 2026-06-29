import { memo } from "react";
import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useShortlistStore } from "@/store/shortlistStore";
import { useToastStore } from "@/store/toastStore";
import { PLATFORM_CONFIG } from "@/utils/platformConfig";
import { Plus, Check } from "lucide-react";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  onProfileClick?: (username: string) => void;
}

function formatFollowersLocal(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M followers";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K followers";
  return count + " followers";
}

export const ProfileCard = memo(function ProfileCard({
  profile,
  platform,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const { addToShortlist, removeFromShortlist, isShortlisted } =
    useShortlistStore();
  const shortlisted = isShortlisted(profile.user_id);
  const config = PLATFORM_CONFIG[platform];

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const showToast = useToastStore((s) => s.show);

  const handleAddRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (shortlisted) {
      removeFromShortlist(profile.user_id);
      showToast(`Removed @${profile.username} from shortlist`);
    } else {
      addToShortlist(profile);
      showToast(`Added @${profile.username} to shortlist`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md transition-all group"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleClick();
      }}
    >
      <img
        src={profile.picture}
        alt={profile.username}
        className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-700 bg-slate-200"
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect fill="#e2e8f0" width="48" height="48"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="#94a3b8" font-size="20" font-family="system-ui">${(profile.username || "?")[0].toUpperCase()}</text></svg>`)}`;
        }}
      />
      <div className="text-left flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-slate-900 dark:text-white truncate">
            @{profile.username}
          </span>
          <VerifiedBadge verified={profile.is_verified} />
          <span
            className={`text-xs px-1.5 py-0.5 rounded ${config.bg} ${config.color} ml-1`}
          >
            {config.label}
          </span>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400 truncate">
          {profile.fullname}
        </div>
        <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          {formatFollowersLocal(profile.followers)}
        </div>
      </div>
      <button
        onClick={handleAddRemove}
        className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
          shortlisted
            ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
            : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800"
        }`}
        aria-label={
          shortlisted
            ? `Remove ${profile.username} from shortlist`
            : `Add ${profile.username} to shortlist`
        }
      >
        {shortlisted ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Added</span>
          </>
        ) : (
          <>
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </>
        )}
      </button>
    </div>
  );
});
