import React, { useState } from "react"
import SearchBar from "./searchBar/SearchBar";

function App() {

  const [search, setSearch] = useState("");

  return (
    <main>
      <nav>
        <div>
          <img src="../src/assets/reddit.png" alt="logo"/>
          <h1>diet reddit</h1>
        </div>
        <SearchBar search={search} setSearch={setSearch}/>
        <a href="http://www.reddit.com" target="_blank"><button>Go to reddit</button></a>
      </nav>
      
    </main>
  )
}

export default App
