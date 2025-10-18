import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Story from "./Story";

// Mock CommentList so we don't have to render full comment tree
jest.mock("../commentList/CommentList", () => () => <div data-testid="comment-list">Comments Here</div>);

describe("Story component", () => {
  const baseTimestamp = Math.floor(Date.now() / 1000);

  const mockPost = {
    id: "abc123",
    author: "testUser",
    created_utc: baseTimestamp - 3600, // 1 hour ago
    title: "Test Story Title",
    ups: 42,
    num_comments: 10,
    subreddit: "testSubreddit",
    preview: {
      images: [
        {
          source: {
            url: "https://example.com/image.jpg",
          },
        },
      ],
    },
  };

  test("renders author, title, time ago, ups and num_comments", () => {
    render(<Story post={mockPost} />);

    expect(screen.getByText("testUser")).toBeInTheDocument();
    expect(screen.getByText("Test Story Title")).toBeInTheDocument();
    expect(screen.getByText("1 hours ago")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  test("renders image from preview", () => {
    render(<Story post={mockPost} />);
    const img = screen.getByAltText("story-pic");
    expect(img).toBeInTheDocument();
    expect(img.src).toBe("https://example.com/image.jpg");
  });

  test("renders 'No image available' when no image in post", () => {
    const postWithoutImage = { ...mockPost, preview: null, url: "", thumbnail: "" };
    render(<Story post={postWithoutImage} />);
    expect(screen.getByText("No image available")).toBeInTheDocument();
  });

  test("toggles comment list visibility when comment button is clicked", () => {
    render(<Story post={mockPost} />);

    // Initially comments should not be visible
    expect(screen.queryByTestId("comment-list")).not.toBeInTheDocument();

    const commentButton = screen.getByRole("button", { name: /10/i });
    fireEvent.click(commentButton);

    // Comments should appear
    expect(screen.getByTestId("comment-list")).toBeInTheDocument();

    // Clicking again hides comments
    fireEvent.click(commentButton);
    expect(screen.queryByTestId("comment-list")).not.toBeInTheDocument();
  });
});
