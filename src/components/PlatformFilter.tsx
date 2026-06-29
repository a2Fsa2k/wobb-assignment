import type { Platform } from "@/types";
import { PLATFORMS } from "@/utils/dataHelpers";
import { PLATFORM_CONFIG } from "@/utils/platformConfig";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
}

export function PlatformFilter({ selected, onChange }: PlatformFilterProps) {
  return (
    <div
      className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit"
      role="tablist"
    >
      {PLATFORMS.map((p) => {
        const config = PLATFORM_CONFIG[p];
        const isActive = selected === p;
        return (
          <button
            key={p}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(p)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isActive
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            <span className="mr-1.5">{config.icon}</span>
            {config.label}
          </button>
        );
      })}
    </div>
  );
}
