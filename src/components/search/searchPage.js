import React, { useState, useEffect } from 'react';
import { MovieCardById, MovieCardByTitle, PersonCardByPerson } from './searchMovie';
import { SearchById, SearchByTitle, SearchByPerson, FindId } from './searchMovie';
import './searchPage.css';
import { NewRating, GetRatingid, NewestRated, TopRatedMovies,GetRatingById } from '../rated/rated';
import { userInfo } from '../register/signals';
import axios from 'axios';

function SearchPage() {

  return (
    <div>
      <SearchBar />
    </div>
  );
}


function SearchBar() {
  const [data, setData] = useState('');
  const [showTopRated, setShowTopRated] = useState(false);
  const [showNewestRated, setShowNewestRated] = useState(false);
  const [showGetRated, setShowGetRated] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDBID, setSearchDBID] = useState('');
  const [watchlistSearchDBID, setWatchlistSearchDBID] = useState('');
  const SearchResultByTitle = SearchByTitle(searchTerm);
  const [showRatingWindow, setShowRatingWindow] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingText, setRatingText] = useState('');
  const [username, setUsername] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedGenreCodes, setSelectedGenreCodes] = useState([]);

  const filteredMovies = SearchResultByTitle.filter((movie) =>
    selectedGenreCodes.every((selectedGenre) => movie.genre_ids.includes(selectedGenre.code))
  );
  const watchlistSearchFindID = FindId(watchlistSearchDBID);
  const searchFindID = FindId(searchDBID);

  const handleGenreChange = (genresCodes) => {
    setSelectedGenreCodes(genresCodes);
    console.log(genresCodes);
  };

  const handleInputChange = (event) => {
    setSearchWord(event.target.value);
  }

  function handleSearch() {
    setSearchTerm(searchWord);
  }

  function handleNewestRated(){
    setShowNewestRated(prevState => !prevState);
  }

  function handleTopRated(){
    setShowTopRated(prevState => !prevState);
  }

  function handleArvostele(searchDBID) {
    console.log('SDBID:', searchDBID);
    setSelectedMovieId(searchDBID);
    setShowRatingWindow(true);
  }

  function handleArvostelu(searchFindID){
    console.log('asdasd', searchFindID);
    setSelectedMovieId(searchFindID);
    setShowGetRated(prevState => !prevState);
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
      console.error('Error:', error.message);
    }
    setShowRatingWindow(false); 
  }
  
  async function handleAddWatchlist(id){
    setWatchlistSearchDBID(id);
    console.log('watchlistSearchFindID immediately after set:', watchlistSearchFindID);
    const movieId = watchlistSearchFindID;
    
    try {
      const requestData = {
        movie_id: movieId,
        username: userInfo.value?.private,
      };
      const response = await axios.put(`http://localhost:3001/profile/addToWatchlist`, requestData);
      console.log('Watchlist updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating watchlist:', error);
    }
  }

  
  
  const SearchResultById = SearchById(searchTerm);
  const SearchResultByPerson = SearchByPerson(searchTerm);

  return (
    <div class='search-container'>
      <div class='search-bar-container'>
        <input
          class='search-bar'
          type="text"
          placeholder="Search..."
          value={searchWord}
          onChange={handleInputChange}
        />

        <button class='search-btn' onClick={handleSearch}>Search</button>

        {isEditing ? (
          <div>
            <FilterMovies closeFilter={() => setIsEditing(false)} onGenreChange={handleGenreChange} />
          </div>
        ) : (
          <img src='assets/filter-icon.png' onClick={() => setIsEditing(true)} alt="editbutton" />
        )}

           <button className='search-btn' onClick={handleNewestRated}>
            Newest Rated
          </button>
          <button className='search-btn' onClick={handleTopRated}>
            Top Rated
          </button>
      </div>

      <div className='selected-genres'>
        <ul className='genre-list'>
          {selectedGenreCodes.map((genre) => (
            <li key={genre.code}>{genre.name}</li>
          ))}
        </ul>
      </div>

      <div className='search-results'>
        {showGetRated ? (
          <GetRatingById RatingById={searchFindID}/>
        ) : (
          <p></p>
        )}
      {showNewestRated ? (
          <NewestRated />

        ) : (
          
           <p></p>
        )}
        {showTopRated ? (
          <TopRatedMovies/>
        ) : (
          
           <p></p>
        )}
        {Array.isArray(filteredMovies) ? (
          filteredMovies.map((searchdata) => (
            <div className='movie-card' key={searchdata.id}>


              {searchdata.poster_path && (
                <img src={`https://images.tmdb.org/t/p/w200${searchdata.poster_path}`} alt={`Poster for ${searchdata.title}`} />
              )}
              <p><strong>{searchdata.original_title}</strong></p>
              <p><strong>Release Date: </strong>{searchdata.release_date}</p>

              <button className='add-watchlist-btn' onClick={() => handleAddWatchlist(searchdata.id)}>+ Watchlist</button>
              <button className='add-watchlist-btn' onClick={() => { setSearchDBID(searchdata.id); handleArvostele(searchdata.id); }}>+ Arvostele</button>
              <button className='add-watchlist-btn' onClick={() => { setSearchDBID(searchdata.id); handleArvostelu(searchFindID); }}>+ Arvostelut</button>
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

      </div>

    </div>
  );
}



function FilterMovies({ closeFilter, onGenreChange }) {

  const [selectedGenres, setSelectedGenres] = useState([]);

  const genreOptions = [
    { name: 'Action', code: 28 },
    { name: 'Adventure', code: 12 },
    { name: 'Animation', code: 16 },
    { name: 'Comedy', code: 35 },
    { name: 'Crime', code: 80 },
    { name: 'Documentary', code: 99 },
    { name: 'Drama', code: 18 },
    { name: 'Family', code: 10751 },
    { name: 'Fantasy', code: 14 },
    { name: 'History', code: 36 },
    { name: 'Horror', code: 27 },
    { name: 'Music', code: 10402 },
    { name: 'Mystery', code: 9648 },
    { name: 'Romance', code: 10749 },
    { name: 'Science Fiction', code: 878 },
    { name: 'TV Movie', code: 10770 },
    { name: 'Thriller', code: 53 },
    { name: 'War', code: 10752 },
    { name: 'Western', code: 37 },
  ];


  const handleGenreChange = (event) => {

    const genre = event.target.value;
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const saveSelectedGenres = () => {
    const selectedGenreCodes = selectedGenres.map((selectedGenre) => {
      const genreObject = genreOptions.find((genre) => genre.name === selectedGenre);
      return genreObject ? { name: genreObject.name, code: genreObject.code } : null;
    });
  
    const validGenreCodes = selectedGenreCodes.filter((genre) => genre !== null);
    console.log('Selected Genre Codes:', validGenreCodes);
  
    onGenreChange(validGenreCodes);
  };

  return (
    <div className='filter-container'>
      <h3>Select Genre:</h3>
      <div>
        {genreOptions.map((genre) => (
          <label key={genre.name}>
            <input
              type='checkbox'
              value={genre.name}
              checked={selectedGenres.includes(genre.name)}
              onChange={handleGenreChange}
            />
            {genre.name}
          </label>
        ))}
      </div>
      <button onClick={() => { saveSelectedGenres(); closeFilter(); }}>Save</button>
      <img src='assets/close-icon.png' alt='Close' onClick={closeFilter} />
      <p>movie</p>
    </div>
  );
}


export default SearchPage;
