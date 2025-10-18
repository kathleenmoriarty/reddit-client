import React from "react";
import { render, screen } from "@testing-library/react";
import Comment from "./Comment";

describe("Comment component", () => {
  const mockComment = {
    author: "testuser",
    text: "This is a comment text"
  };

  test("renders author name, comment text, and profile image", () => {
    render(<Comment comment={mockComment} />);

    // Check if author name appears
    expect(screen.getByText("testuser")).toBeInTheDocument();

    // Check if comment text appears
    expect(screen.getByText("This is a comment text")).toBeInTheDocument();

    // Check if profile image is present with correct alt text
    const img = screen.getByAltText("profile-pic");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      "src",
      "https://www.redditstatic.com/avatars/avatar_default_02_0DD3BB.png"
    );

    // Check if static time "Just now" is displayed
    expect(screen.getByText("Just now")).toBeInTheDocument();
  });
});
