import type { Platform } from "@/types";

export const PLATFORM_CONFIG: Record<
  Platform,
  { label: string; color: string; bg: string; border: string; icon: string }
> = {
  instagram: {
    label: "Instagram",
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-200",
    icon: "📸",
  },
  youtube: {
    label: "YouTube",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "▶️",
  },
  tiktok: {
    label: "TikTok",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    icon: "🎵",
  },
};
