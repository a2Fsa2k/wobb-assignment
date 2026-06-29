import { describe, it, expect, beforeEach } from "vitest";
import { useShortlistStore } from "@/store/shortlistStore";
import type { UserProfileSummary } from "@/types";

const mockProfile = (id: string): UserProfileSummary => ({
  user_id: id,
  username: `user_${id}`,
  url: `https://example.com/${id}`,
  picture: `https://example.com/${id}.jpg`,
  fullname: `User ${id}`,
  is_verified: true,
  followers: 1000,
});

describe("shortlistStore", () => {
  beforeEach(() => {
    useShortlistStore.setState({ shortlisted: [] });
  });

  it("starts with an empty shortlist", () => {
    expect(useShortlistStore.getState().shortlisted).toEqual([]);
  });

  it("adds a profile to the shortlist", () => {
    const profile = mockProfile("1");
    useShortlistStore.getState().addToShortlist(profile);
    expect(useShortlistStore.getState().shortlisted).toHaveLength(1);
    expect(useShortlistStore.getState().shortlisted[0].user_id).toBe("1");
  });

  it("prevents duplicate entries", () => {
    const profile = mockProfile("1");
    useShortlistStore.getState().addToShortlist(profile);
    useShortlistStore.getState().addToShortlist(profile);
    expect(useShortlistStore.getState().shortlisted).toHaveLength(1);
  });

  it("removes a profile by user_id", () => {
    useShortlistStore.getState().addToShortlist(mockProfile("1"));
    useShortlistStore.getState().addToShortlist(mockProfile("2"));
    useShortlistStore.getState().removeFromShortlist("1");
    expect(useShortlistStore.getState().shortlisted).toHaveLength(1);
    expect(useShortlistStore.getState().shortlisted[0].user_id).toBe("2");
  });

  it("isShortlisted returns correct boolean", () => {
    const store = useShortlistStore.getState();
    store.addToShortlist(mockProfile("1"));
    expect(store.isShortlisted("1")).toBe(true);
    expect(store.isShortlisted("2")).toBe(false);
  });

  it("clears the entire shortlist", () => {
    useShortlistStore.getState().addToShortlist(mockProfile("1"));
    useShortlistStore.getState().addToShortlist(mockProfile("2"));
    useShortlistStore.getState().clearShortlist();
    expect(useShortlistStore.getState().shortlisted).toEqual([]);
  });

  it("handles multiple add/remove operations correctly", () => {
    const store = useShortlistStore.getState();
    store.addToShortlist(mockProfile("1"));
    store.addToShortlist(mockProfile("2"));
    store.removeFromShortlist("1");
    store.addToShortlist(mockProfile("3"));
    store.addToShortlist(mockProfile("1")); // re-add
    expect(useShortlistStore.getState().shortlisted).toHaveLength(3);
  });
});
