import React from 'react';
import { render, screen } from '@testing-library/react';
import StoryCard from './StoryCard';
import Story from '../story/Story';

// Mock the Story component so we don’t have to render its full implementation
jest.mock('../story/Story', () => ({ post }) => (
  <div data-testid="mock-story">{post.title}</div>
));

describe('StoryCard', () => {
  const mockPosts = [
    { data: { id: '1', title: 'First Post' } },
    { data: { id: '2', title: 'Second Post' } },
  ];

  test('renders correct number of Story components with correct post data', () => {
    render(<StoryCard posts={mockPosts} />);

    // There should be two Story components rendered
    const storyElements = screen.getAllByTestId('mock-story');
    expect(storyElements).toHaveLength(mockPosts.length);

    // Each should display the correct title (from mock)
    expect(storyElements[0]).toHaveTextContent('First Post');
    expect(storyElements[1]).toHaveTextContent('Second Post');
  });

  test('renders no Story components when posts is empty', () => {
    render(<StoryCard posts={[]} />);
    const storyElements = screen.queryAllByTestId('mock-story');
    expect(storyElements).toHaveLength(0);
  });
});
