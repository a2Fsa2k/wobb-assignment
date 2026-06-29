import { useMemo } from "react";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { SearchInput } from "@/components/SearchInput";
import { ProfileList } from "@/components/ProfileList";
import { ShortlistPanel } from "@/components/ShortlistPanel";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";
import { useSearchStore } from "@/store/searchStore";

export function SearchPage() {
  const platform = useSearchStore((s) => s.platform);
  const searchQuery = useSearchStore((s) => s.searchQuery);
  const setPlatform = useSearchStore((s) => s.setPlatform);
  const setSearchQuery = useSearchStore((s) => s.setSearchQuery);

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(
    () => filterProfiles(allProfiles, searchQuery),
    [allProfiles, searchQuery]
  );

  const handleProfileClick = (username: string) => {
    console.log("Clicked profile:", username);
  };

  return (
    <Layout title="Find Influencers">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Find Influencers
          </h1>
          <p className="text-slate-500 mt-1">
            Browse top creators across social platforms
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <PlatformFilter selected={platform} onChange={setPlatform} />
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-900">
            {filtered.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-900">
            {allProfiles.length}
          </span>{" "}
          profiles on{" "}
          <span className="font-semibold text-slate-900 capitalize">
            {platform}
          </span>
        </div>

        <ProfileList
          profiles={filtered}
          platform={platform}
          onProfileClick={handleProfileClick}
        />
      </div>

      <ShortlistPanel />
    </Layout>
  );
}
