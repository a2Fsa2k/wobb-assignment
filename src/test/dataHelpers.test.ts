import { describe, it, expect } from "vitest";
import { filterProfiles, getPlatformLabel } from "@/utils/dataHelpers";
import type { UserProfileSummary } from "@/types";

const mockProfiles: UserProfileSummary[] = [
  {
    user_id: "1",
    username: "cristiano",
    fullname: "Cristiano Ronaldo",
    url: "",
    picture: "",
    is_verified: true,
    followers: 600000000,
  },
  {
    user_id: "2",
    username: "MrBeast6000",
    fullname: "MrBeast",
    url: "",
    picture: "",
    is_verified: true,
    followers: 324000000,
  },
  {
    user_id: "3",
    username: "khaby.lame",
    fullname: "Khabane Lame",
    url: "",
    picture: "",
    is_verified: true,
    followers: 162800000,
  },
];

describe("filterProfiles", () => {
  it("returns all profiles when query is empty", () => {
    expect(filterProfiles(mockProfiles, "")).toHaveLength(3);
  });

  it("filters by username (case-insensitive)", () => {
    const result = filterProfiles(mockProfiles, "CRISTIANO");
    expect(result).toHaveLength(1);
    expect(result[0].username).toBe("cristiano");
  });

  it("filters by fullname (case-insensitive)", () => {
    const result = filterProfiles(mockProfiles, "khabane");
    expect(result).toHaveLength(1);
    expect(result[0].username).toBe("khaby.lame");
  });

  it("returns empty array when no match", () => {
    expect(filterProfiles(mockProfiles, "nonexistent")).toHaveLength(0);
  });

  it("matches partial username", () => {
    const result = filterProfiles(mockProfiles, "mrbeast");
    expect(result).toHaveLength(1);
  });
});

describe("getPlatformLabel", () => {
  it("returns correct labels", () => {
    expect(getPlatformLabel("instagram")).toBe("Instagram");
    expect(getPlatformLabel("youtube")).toBe("YouTube");
    expect(getPlatformLabel("tiktok")).toBe("TikTok");
  });
});
