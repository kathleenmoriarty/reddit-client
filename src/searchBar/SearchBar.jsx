import React from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ search, setSearch, handleSearch }) => {
  return (
    <div className="search">
      <button type="submit" onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /></button>
      <input
        id="search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Reddit"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
    </div>
  );
};

export default SearchBar;