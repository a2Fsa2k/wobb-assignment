import { useEffect, useState, useCallback } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { ShortlistPanel } from "@/components/ShortlistPanel";
import { useShortlistStore } from "@/store/shortlistStore";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { ArrowLeft, Plus, Check, ExternalLink } from "lucide-react";

function formatFollowersDetail(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(2) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return String(count);
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null
  );
  const [loaded, setLoaded] = useState(false);

  const { addToShortlist, removeFromShortlist, isShortlisted } =
    useShortlistStore();

  useEffect(() => {
    if (!username) return;

    let cancelled = false;
    setLoaded(false);
    setProfileData(null);

    loadProfileByUsername(username).then((data) => {
      if (cancelled) return;
      setProfileData(data);
      setLoaded(true);
    });

    return () => {
      cancelled = true;
    };
  }, [username]);

  const user: FullUserProfile | null = profileData?.data.user_profile ?? null;
  const shortlisted = user ? isShortlisted(user.user_id) : false;

  const handleToggleShortlist = useCallback(() => {
    if (!user) return;
    if (shortlisted) {
      removeFromShortlist(user.user_id);
    } else {
      addToShortlist({
        user_id: user.user_id,
        username: user.username,
        url: user.url,
        picture: user.picture,
        fullname: user.fullname,
        is_verified: user.is_verified,
        followers: user.followers,
        engagements: user.engagements,
        engagement_rate: user.engagement_rate,
      });
    }
  }, [user, shortlisted, addToShortlist, removeFromShortlist]);

  if (!username) {
    return (
      <Layout>
        <div className="text-center py-16">
          <p className="text-slate-600 text-lg">Invalid profile</p>
          <Link
            to="/"
            className="inline-flex items-center gap-1 mt-3 text-indigo-600 hover:text-indigo-700 font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to search
          </Link>
        </div>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title={`@${username}`}>
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <span className="ml-3 text-slate-500">Loading profile...</span>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout title={`@${username}`}>
        <div className="text-center py-16">
          <p className="text-red-600 font-medium">
            Could not load profile details for @{username}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-1 mt-3 text-indigo-600 hover:text-indigo-700 font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to search
          </Link>
        </div>
      </Layout>
    );
  }

  const statCards = [
    { label: "Followers", value: formatFollowersDetail(user.followers) },
    {
      label: "Engagement Rate",
      value:
        user.engagement_rate !== undefined
          ? (user.engagement_rate * 100).toFixed(2) + "%"
          : "N/A",
    },
    ...(user.posts_count !== undefined
      ? [{ label: "Posts", value: String(user.posts_count) }]
      : []),
    ...(user.avg_likes !== undefined
      ? [
        {
          label: "Avg Likes",
          value: formatFollowersDetail(user.avg_likes),
        },
      ]
      : []),
    ...(user.avg_comments !== undefined
      ? [{ label: "Avg Comments", value: String(user.avg_comments) }]
      : []),
    ...(user.avg_views !== undefined && user.avg_views > 0
      ? [
        {
          label: "Avg Views",
          value: formatFollowersDetail(user.avg_views),
        },
      ]
      : []),
    ...(user.engagements !== undefined
      ? [
        {
          label: "Engagements",
          value: formatFollowersDetail(user.engagements),
        },
      ]
      : []),
  ];

  return (
    <Layout title={user.fullname}>
      <div className="max-w-2xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to search
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-start gap-5">
            <img
              src={user.picture}
              alt={user.username}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-slate-50 bg-slate-200"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect fill="#e2e8f0" width="80" height="80"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="#94a3b8" font-size="32" font-family="system-ui">${(user.username || "?")[0].toUpperCase()}</text></svg>`)}`;
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-slate-900">
                  @{user.username}
                </h1>
                <VerifiedBadge verified={user.is_verified} />
              </div>
              <p className="text-slate-600 mt-0.5">{user.fullname}</p>
              <p className="text-xs text-slate-400 mt-1 capitalize">
                {platform}
              </p>

              {user.description && (
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {user.description}
                </p>
              )}

              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={handleToggleShortlist}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                    shortlisted
                      ? "bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {shortlisted ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Shortlist
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" /> Add to Shortlist
                    </>
                  )}
                </button>

                {user.url && (
                  <a
                    href={user.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Profile
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {statCards.map((stat) => (
              <div
                key={stat.label}
                className="bg-slate-50 rounded-xl p-4 text-center"
              >
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                  {stat.label}
                </div>
                <div className="text-lg font-bold text-slate-900 mt-1">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ShortlistPanel />
    </Layout>
  );
}
