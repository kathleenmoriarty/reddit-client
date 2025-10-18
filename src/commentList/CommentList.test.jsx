import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import CommentList from "./CommentList";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

// Enable fetch mocking
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

const mockStore = configureStore([]);

jest.mock("../comment/Comment", () => ({ comment }) => (
  <div data-testid="comment-item">
    <strong>{comment.author}:</strong> {comment.text}
  </div>
));

describe("CommentList", () => {
  let store;

  beforeEach(() => {
    fetch.resetMocks();
    store = mockStore({
      auth: { token: "fake-token" }
    });
  });

  test("fetches and renders comments", async () => {
    const fakeApiResponse = [
      {}, // reddit returns an array with post info at [0], comments at [1]
      {
        data: {
          children: [
            { data: { author: "user1", body: "First comment" } },
            { data: { author: "user2", body: "Second comment" } }
          ]
        }
      }
    ];

    fetch.mockResponseOnce(JSON.stringify(fakeApiResponse));

    render(
      <Provider store={store}>
        <CommentList postId="abc123" subreddit="testSub" />
      </Provider>
    );

    // Wait for comments to load and appear in DOM
    await waitFor(() => {
      expect(screen.getAllByTestId("comment-item").length).toBe(2);
    });

    expect(screen.getByText("user1:")).toBeInTheDocument();
    expect(screen.getByText("First comment")).toBeInTheDocument();
    expect(screen.getByText("user2:")).toBeInTheDocument();
    expect(screen.getByText("Second comment")).toBeInTheDocument();
  });

  test("shows fallback message when no comments", async () => {
    const emptyResponse = [{}, { data: { children: [] } }];

    fetch.mockResponseOnce(JSON.stringify(emptyResponse));

    render(
      <Provider store={store}>
        <CommentList postId="abc123" subreddit="testSub" />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("No comments found.")).toBeInTheDocument();
    });
  });

  test("handles fetch error and shows fallback message", async () => {
    fetch.mockRejectOnce(new Error("API failure"));

    render(
      <Provider store={store}>
        <CommentList postId="abc123" subreddit="testSub" />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("No comments found.")).toBeInTheDocument();
    });
  });

  test("does not fetch when token is missing", () => {
    // Provide store with no token
    store = mockStore({ auth: { token: null } });

    render(
      <Provider store={store}>
        <CommentList postId="abc123" subreddit="testSub" />
      </Provider>
    );

    // fetch should not be called if token missing
    expect(fetch).not.toHaveBeenCalled();
  });
});
