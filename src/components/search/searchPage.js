import React, { useState, useEffect } from 'react';
import { MovieCardById, MovieCardByTitle, PersonCardByPerson } from './searchMovie';
import { SearchById, SearchByTitle, SearchByPerson } from './searchMovie';
import './searchPage.css';
import axios from 'axios';


function SearchPage(){

  return(
    <div>
      <SearchBar />
    </div>
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
            <div className='movie-card' key={searchdata.id}>
              {searchdata.poster_path && (
                <img src={`https://images.tmdb.org/t/p/w200${searchdata.poster_path}`} alt={`Poster for ${searchdata.title}`} />
              )}
              <p><strong>Rating: </strong>7.5</p>
              <p><strong>{searchdata.original_title}</strong></p>
              <p><strong>Release Date: </strong>{searchdata.release_date}</p>
              <button className='add-watchlist-btn'>+ Watchlist</button>
            </div>
        ))
        ) : (
        <p>Loading...</p>
        )}
        {Array.isArray(SearchResultById) ? (
          SearchResultById.map((searchdata) => (
            <div className='movie-card' key={searchdata.id}>
              {searchdata.poster_path && (
                <img src={`https://images.tmdb.org/t/p/w200${searchdata.poster_path}`} alt={`Poster for ${searchdata.title}`} />
              )}
              <p><strong>Rating: </strong>7.5</p>
              <p><strong>{searchdata.original_title}</strong></p>
              <p><strong>Release Date: </strong>{searchdata.release_date}</p>
              <div>
                <button className='add-watchlist-btn'>+ Watchlist</button>
                <div></div>
              </div>          
            </div>
        ))
        ) : (
        <p>Loading...</p>
        )}
        {Array.isArray(SearchResultByPerson) ? (
          SearchResultByPerson.map((searchdata) => (
            <div className='movie-card' key={searchdata.id}>
              {searchdata.poster_path && (
                <img src={`https://images.tmdb.org/t/p/w200${searchdata.profile_path}`} alt={`Poster for ${searchdata.title}`} />
              )}
              <p><strong>Name: </strong>{searchdata.name}</p>
              <p><strong>Known for: </strong>{searchdata.known_for_department}</p>
              <p><strong>Media type: </strong>{searchdata.media_type}</p>
        </div>
      ))
      ) : (
      <p>Loading...</p>
      )}
      </div>

    </div>
  );
}


function FindId(id){

  const [ImdbId, setImdbId] = useState('');
  useEffect(() => {
    async function fetchData() {
      try {
        const options = {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NGNmYzA4ZGVhMTAwZTM5OWQ4N2I4NTNlNzViMWZmNCIsInN1YiI6IjY1NjViYzVmYzJiOWRmMDEzYWUzZDU2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rrVdXNYoMFrO2zTlNB55yGjWUPfw3SmiJ4QnKhIbhX0',
          },
          params: {
            query: id,
          },
        };
        const url = 'https://api.themoviedb.org/3/movie/597/external_ids';
        const searchRes = await axios.get(url, options);

        setImdbId(searchRes.data.imdb_id);
        console.log(ImdbId);

      } catch (error) {
        setImdbId('loading');
        console.error(error);
      }
    }
    fetchData();
  }, []);
  
  return ImdbId;
}

export default SearchPage;