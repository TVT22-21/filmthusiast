
import React, { useState, useEffect } from 'react';
import { MovieCardById, MovieCardByTitle, PersonCardByPerson } from './searchMovie';
import { SearchById, SearchByTitle, SearchByPerson, FindId } from './searchMovie';
import './searchPage.css';
import { NewRating } from '../rated/rated';
import axios from 'axios';


function SearchPage() {

  return (
    <div>
      <SearchBar />
    </div>
  );
}

function SearchBar() {

  const [searchWord, setSearchWord] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDBID, setSearchDBID] = useState('');
  const [showRatingWindow, setShowRatingWindow] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingText, setRatingText] = useState('');
  const [username, setUsername] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(null);


  const handleInputChange = (event) => {
    setSearchWord(event.target.value);
  }

  function handleSearch() {
    setSearchTerm(searchWord);
  }

  function handleArvostele(searchDBID) {
    console.log('SDBID:', searchDBID);
    setSelectedMovieId(searchDBID);
    setShowRatingWindow(true);

  }
  const handleCloseRatingWindow = () => {
    setShowRatingWindow(false);
  }

  const handleRatingSubmit = async () => {
    console.log(`${searchFindID}Rating: ${rating}, Rating Text: ${ratingText}, Username: ${username}`);
    try {
      const result = await NewRating(searchFindID, rating, ratingText, username);
      console.log('Result:', result);
    } catch (error) {
      console.error('Error:', error);
    }
    setShowRatingWindow(false); 
  }



  //const joo = FindId('597');
  //console.log('jojojoj', joo);
  const searchFindID = FindId(searchDBID);
  const SearchResultByTitle = SearchByTitle(searchTerm);
  const SearchResultById = SearchById(searchTerm);
  const SearchResultByPerson = SearchByPerson(searchTerm);

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
              <button className='add-watchlist-btn' onClick={() => { setSearchDBID(searchdata.id); handleArvostele(searchdata.id); }}>+ Arvostele</button>
              {showRatingWindow && selectedMovieId === searchdata.id && (
                <div className="rating-window">
                  <h3>Rate item with ID {searchFindID}</h3>
                  <label>
                    Rating:
                    <input
                      type="number"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    />
                  </label>
                  <label>
                    Rating Text:
                    <input
                      type="text"
                      value={ratingText}
                      onChange={(e) => setRatingText(e.target.value)}
                    />
                  </label>
                  <label>
                    Username:
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </label>
                  <button onClick={handleRatingSubmit}>Submit</button>
                  <button onClick={handleCloseRatingWindow}>Close</button>
                </div>
              )}
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
                <button className='add-watchlist-btn'>+ Arvostele</button>
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




export default SearchPage;
