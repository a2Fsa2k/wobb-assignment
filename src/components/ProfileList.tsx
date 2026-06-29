import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  onProfileClick: (username: string) => void;
}

export function ProfileList({
  profiles,
  platform,
  onProfileClick,
}: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400 dark:text-slate-500">
        <p className="text-lg font-medium dark:text-slate-300">No profiles found</p>
        <p className="text-sm mt-1">Try adjusting your search or platform filter</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          platform={platform}
          onProfileClick={onProfileClick}
        />
      ))}
    </div>
  );
}
