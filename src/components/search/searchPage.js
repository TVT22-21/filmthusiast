
import React, { useState, useEffect } from 'react';
import { MovieCardById, MovieCardByTitle, PersonCardByPerson } from './searchMovie';
import { SearchById, SearchByTitle, SearchByPerson } from './searchMovie';
import './searchPage.css';


function SearchPage(){

  return(
    <SearchBar />
  );
}

function SearchBar(){

  const [searchWord, setSearchWord] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchWord(event.target.value);
  }

  function handleSearch(){
    setSearchTerm(searchWord);
  }
  
  const SearchResultByTitle = SearchByTitle( searchTerm );
  const SearchResultById = SearchById( searchTerm );
  const SearchResultByPerson = SearchByPerson( searchTerm );

  return (
    <div className='search-container'>
      <div className='search-bar-container'>
        <input
          className='search-bar'
          type="text"
          placeholder="Search..."
          value={searchWord}
          onChange={handleInputChange}
        />
        <button className='search-btn' onClick={handleSearch}>Search</button>
      </div>
      
      <div className='search-results'>
        {Array.isArray(SearchResultByTitle) ? (
          SearchResultByTitle.map((searchdata) => (
            <div key={searchdata.id}>
              {searchdata.poster_path && (
                <img src={`https://images.tmdb.org/t/p/w200${searchdata.poster_path}`} alt={`Poster for ${searchdata.title}`} />
              )}
              <p><strong>{searchdata.original_title}</strong></p>
              <p><strong>Release Date: </strong>{searchdata.release_date}</p>
              <p><strong>Language: </strong>{searchdata.original_language}</p>
              <p><strong>Media type: </strong>{searchdata.media_type}</p>
              <p><strong>Genre Ids: </strong>{searchdata.genre_ids+ ','}</p>
            </div>
        ))
        ) : (
        <p>Loading...</p>
        )}
        {Array.isArray(SearchResultById) ? (
          SearchResultById.map((searchdata) => (
            <div key={searchdata.id}>
              {searchdata.poster_path && (
                <img src={`https://images.tmdb.org/t/p/w200${searchdata.poster_path}`} alt={`Poster for ${searchdata.title}`} />
              )}
              <p><strong>{searchdata.original_title}</strong></p>
              <p><strong>Release Date: </strong>{searchdata.release_date}</p>
              <p><strong>Language: </strong>{searchdata.original_language}</p>
              <p><strong>Media type: </strong>{searchdata.media_type}</p>
              <p><strong>Genre Ids: </strong>{searchdata.genre_ids+ ','}</p>
            </div>
        ))
        ) : (
        <p>Loading...</p>
        )}
        {Array.isArray(SearchResultByPerson) ? (
          SearchResultByPerson.map((searchdata) => (
            <div key={searchdata.id}>
              {searchdata.poster_path && (
                <img src={`https://images.tmdb.org/t/p/w200${searchdata.profile_path}`} alt={`Poster for ${searchdata.title}`} />
              )}
              <p><strong>Name: </strong>{searchdata.name}</p>
              <p><strong>Known for: </strong>{searchdata.known_for_department}</p>
              <p><strong>Media type: </strong>{searchdata.media_type}</p>
              <p><strong>Genre Ids: </strong>{searchdata.genre_ids+ ','}</p>
        </div>
      ))
      ) : (
      <p>Loading...</p>
      )}
      </div>

    </div>
  );
}

export default SearchPage;
