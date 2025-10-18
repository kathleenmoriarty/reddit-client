// SearchBar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar component', () => {
  let setSearchMock;
  let handleSearchMock;

  beforeEach(() => {
    setSearchMock = jest.fn();
    handleSearchMock = jest.fn();

    render(
      <SearchBar
        search="reactjs"
        setSearch={setSearchMock}
        handleSearch={handleSearchMock}
      />
    );
  });

  test('renders input with correct initial value', () => {
    const input = screen.getByPlaceholderText('Search Reddit');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('reactjs');
  });

  test('calls setSearch when typing in input', () => {
    const input = screen.getByPlaceholderText('Search Reddit');
    fireEvent.change(input, { target: { value: 'webdev' } });

    expect(setSearchMock).toHaveBeenCalledWith('webdev');
  });

  test('calls handleSearch on Enter key press', () => {
    const input = screen.getByPlaceholderText('Search Reddit');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(handleSearchMock).toHaveBeenCalled();
  });
});
