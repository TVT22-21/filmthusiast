
import React, { useState } from 'react';
import { SearchByTitle, MovieCardByTitle } from './searchMovie';



function SearchBar()  {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  
  const handleSearch = () => {
    setSearchResults(SearchByTitle(searchTerm));
  };

  return (
    <div>
      <p>------------------------------------------------------------------</p>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
        
      <div>
        <h2>Search Results:</h2>
          <MovieCardByTitle movieData={searchResults} />
      </div>
    </div>
  );
};



export default SearchBar;