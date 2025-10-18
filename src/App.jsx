import React, { useEffect, useState } from "react"
import SearchBar from "./searchBar/SearchBar";
import StoryCard from "./storyCard/StoryCard";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from './features/auth/authSlice';
import {fetchPosts} from './features/posts/postsSlice'
import redditLogo from './assets/reddit.png'

/*const mockData = {
  title: "Mock Title that is really blah blah",
  image: "../src/assets/reddit.png",
  likes: 19.8,
  author: "MC-Clap-your-hands",
  time: "8 hrs ago",
  comments: 918,
  commentors: [
    ["author1", "I did n't like it"],
    ["author2", "I liked it alot"],
    ["author3", "it was mid"]
  ]
};*/

const clientId = import.meta.env.VITE_REDDIT_CLIENT_ID;
const redirectUri = import.meta.env.VITE_REDDIT_REDIRECT_URI;
const scopes = import.meta.env.VITE_REDDIT_SCOPES;
const state = import.meta.env.VITE_REDDIT_STATE;

const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=token&state=${state}&redirect_uri=${redirectUri}&duration=temporary&scope=${scopes}`;

console.log("Auth URL: ", authUrl);

function App() {

  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token);
  const posts = useSelector(state => state.posts.posts);

  const loginWithReddit = () => {
    window.location.href = authUrl;
  };

  useEffect(() => {
    const hash = window.location.hash.substring(1); // remove #
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const returnedState = params.get('state');

    console.log('Returned from Reddit with:');
    console.log('access_token:', accessToken);
    console.log('state:', returnedState);

    if (accessToken) {
      dispatch(setToken(accessToken)); // save token in Redux
      dispatch(fetchPosts({ token: accessToken, subreddit: 'javascript' })); // fetch posts
      window.history.replaceState(null, '', '/'); // clean URL
    }
  }, [dispatch]);
  

  return (
    <main>
      {!token ? (
        <button onClick={loginWithReddit}>Login with Reddit</button>
      ) : (
        <>
          <nav>
            <div className="logo">
              <img src={redditLogo} alt="logo"/>
              <h1>diet reddit</h1>
            </div>
            <SearchBar search={search} setSearch={setSearch}/>
            <a href="http://www.reddit.com" target="_blank" rel="noopener noreferrer">
              <button className="to-reddit">Go to reddit</button>
            </a>
          </nav>
          <div className="container">
            <div>
              <StoryCard posts={posts} />
            </div>
            
            <div className="subreddits">
              <h3>Subreddits</h3>
            </div>
          </div>
          
        </>
      )}
      
    </main>
  )
}

export default App
