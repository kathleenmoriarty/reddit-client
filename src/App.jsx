import React, { useEffect, useState } from "react"
import SearchBar from "./searchBar/SearchBar";
import StoryCard from "./storyCard/StoryCard";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from './features/auth/authSlice';
import {fetchPosts} from './features/posts/postsSlice'
import redditLogo from './assets/reddit.png'
import { clientId, redirectUri, scopes, state } from './config';

const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=token&state=${state}&redirect_uri=${redirectUri}&duration=temporary&scope=${scopes}`;

console.log("Auth URL: ", authUrl);

function App() {

  const [search, setSearch] = useState("");
  const [subreddits, setSubreddits] = useState([]);
  const [selectedSubreddit, setSelectedSubreddit] = useState("popular");

  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token);
  const posts = useSelector(state => state.posts.posts);

  const loginWithReddit = () => {
    window.location.href = authUrl;
  };

  const handleSearch = () => {
    const trimmed = search.trim();
    if (trimmed) {
      setSelectedSubreddit(trimmed); // update display
    }
  };
  

  const handleSubredditClick = (subreddit) => {
    setSelectedSubreddit(subreddit);
    dispatch(fetchPosts({ token, subreddit }));
  };

  const fetchPopularSubreddits = async (token) => {
    try {
      const response = await fetch('https://oauth.reddit.com/subreddits/popular', {
        headers: {
          Authorization: `Bearer ${token}`,
          'User-Agent': 'diet-reddit-app/0.1 by YourUsername'
        }
      });
      const data = await response.json();
      if (data && data.data && data.data.children) {
        // Extract subreddit names
        const subs = data.data.children.map(child => child.data.display_name);
        setSubreddits(subs);
      }
    } catch (error) {
      console.error("Failed to fetch popular subreddits:", error);
    }
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
      setSelectedSubreddit("popular"); // set this
      dispatch(fetchPosts({ token: accessToken, subreddit: selectedSubreddit })); // fetch posts
      fetchPopularSubreddits(accessToken);
      window.history.replaceState(null, '', '/');
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchPosts({ token, subreddit: selectedSubreddit }));
      fetchPopularSubreddits(token);  // Also keep popular subreddits updated after login
    }
  }, [dispatch, token, selectedSubreddit]);


  return (
    <main>
      {!token ? (
        <button onClick={loginWithReddit} className="login-btn">Login with Reddit</button>
      ) : (
        <>
          <nav>
            <div className="logo">
              <img src={redditLogo} alt="logo"/>
              <h1>diet reddit</h1>
            </div>
            <SearchBar search={search} setSearch={setSearch} handleSearch={handleSearch}/>
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
              <ul>
                {subreddits.length > 0 ? subreddits.map((sub) => (
                  <li 
                    key={sub} 
                    onClick={() => handleSubredditClick(sub)}
                    style={{ 
                      cursor: 'pointer', 
                      fontWeight: sub === selectedSubreddit ? 'bold' : 'normal' 
                    }}
                  >
                    r/{sub}
                  </li>
                )) : (
                  <li>Loading popular subreddits...</li>
                )}
              </ul>
            </div>
          </div>
          
        </>
      )}
      
    </main>
  )
}

export default App
