import React, { useState } from "react"
import SearchBar from "./searchBar/SearchBar";
import StoryCard from "./storyCard/StoryCard";

const mockData = {
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
};

function App() {

  const [search, setSearch] = useState("");

  return (
    <main>
      <nav>
        <div className="logo">
          <img src="../src/assets/reddit.png" alt="logo"/>
          <h1>diet reddit</h1>
        </div>
        <SearchBar search={search} setSearch={setSearch}/>
        <a href="'http://www.reddit.com" target="_blank">
          <button className="to-reddit">Go to reddit</button>
        </a>
      </nav>
      <StoryCard mockData={mockData} />
    </main>
  )
}

export default App
