import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProfileCard } from "@/components/ProfileCard";
import { useShortlistStore } from "@/store/shortlistStore";
import type { UserProfileSummary } from "@/types";

const mockProfile: UserProfileSummary = {
  user_id: "1",
  username: "cristiano",
  fullname: "Cristiano Ronaldo",
  url: "",
  picture: "https://example.com/pic.jpg",
  is_verified: true,
  followers: 600000000,
};

function renderCard() {
  return render(
    <MemoryRouter>
      <ProfileCard
        profile={mockProfile}
        platform="instagram"
        onProfileClick={() => {}}
      />
    </MemoryRouter>
  );
}

describe("ProfileCard", () => {
  beforeEach(() => {
    useShortlistStore.setState({ shortlisted: [] });
  });

  it("renders username with @ prefix", () => {
    renderCard();
    expect(screen.getByText("@cristiano")).toBeInTheDocument();
  });

  it("renders full name", () => {
    renderCard();
    expect(screen.getByText("Cristiano Ronaldo")).toBeInTheDocument();
  });

  it("renders verified badge for verified accounts", () => {
    renderCard();
    expect(screen.getByLabelText("Verified account")).toBeInTheDocument();
  });

  it("renders Add to List button", () => {
    renderCard();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("renders follower count", () => {
    renderCard();
    expect(screen.getByText("600.0M followers")).toBeInTheDocument();
  });

  it("shows platform badge", () => {
    renderCard();
    expect(screen.getByText("Instagram")).toBeInTheDocument();
  });
});
