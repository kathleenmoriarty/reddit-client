// src/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ token, subreddit }) => {
    const res = await fetch(`https://oauth.reddit.com/r/${subreddit}/hot`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'web:redditclone:v1.0 (by /u/YOUR_USERNAME)',
      },
    });
    const data = await res.json();
    console.log('Fetched posts:', data);
    return data.data.children;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default postsSlice.reducer;
