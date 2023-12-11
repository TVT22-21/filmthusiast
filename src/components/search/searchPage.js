
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
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGenreCodes, setSelectedGenreCodes] = useState([]);

  const SearchResultByTitle = SearchByTitle(searchTerm);
  
  const filteredMovies = SearchResultByTitle.filter((movie) =>
    selectedGenreCodes.every((selectedGenre) => movie.genre_ids.includes(selectedGenre.code))
  );
  
  //const SearchResultById = SearchById( searchTerm );
  //const SearchResultByPerson = SearchByPerson( searchTerm );

  const handleInputChange = (event) => {
    setSearchWord(event.target.value);
  }

  function handleSearch(){
    setSearchTerm(searchWord);
  }

  const handleGenreChange = (genresCodes) => {
    setSelectedGenreCodes(genresCodes);
    console.log(genresCodes);
  };


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
      </div>

      <div class='selected-genres'>
        <ul class='genre-list'>
          {selectedGenreCodes.map((genre) => (
            <li key={genre.code}>{genre.name}</li>
          ))}
        </ul>
      </div>
      
      <div class='search-results'>
        {Array.isArray(filteredMovies) ? (
          filteredMovies.map((searchdata) => (
            <div class='movie-card' key={searchdata.id}>
              {searchdata.poster_path && (
                <img src={`https://images.tmdb.org/t/p/w200${searchdata.poster_path}`} alt={`Poster for ${searchdata.title}`} />
              )}
              <p><strong>Rating: </strong>7.5</p>
              <p><strong>{searchdata.original_title}</strong></p>
              <p><strong>Release Date: </strong>{searchdata.release_date}</p>
              <button class='add-watchlist-btn'>+ Watchlist</button>
            </div>
        ))
        ) : (
        <p>Loading...</p>
        )}
        {Array.isArray(filteredMovies) ? (
          filteredMovies.map((searchdata) => (
            <div class='movie-card' key={searchdata.id}>
              {searchdata.poster_path && (
                <img src={`https://images.tmdb.org/t/p/w200${searchdata.poster_path}`} alt={`Poster for ${searchdata.title}`} />
              )}
              <p><strong>Rating: </strong>7.5</p>
              <p><strong>{searchdata.original_title}</strong></p>
              <p><strong>Release Date: </strong>{searchdata.release_date}</p>
              <div>
                <button class='add-watchlist-btn'>+ Watchlist</button>
                <div></div>
              </div>          
            </div>
        ))
        ) : (
        <p>Loading...</p>
        )}
        {Array.isArray(filteredMovies) ? (
          filteredMovies.map((searchdata) => (
            <div class='movie-card' key={searchdata.id}>
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
    <div class='filter-container'>
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


function FindId(wrongId){

  const [ImdbId, setImdbId] = useState('');
  useEffect(() => {
    async function fetchDataFindId() {
      try {
        const options = {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NGNmYzA4ZGVhMTAwZTM5OWQ4N2I4NTNlNzViMWZmNCIsInN1YiI6IjY1NjViYzVmYzJiOWRmMDEzYWUzZDU2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rrVdXNYoMFrO2zTlNB55yGjWUPfw3SmiJ4QnKhIbhX0',
          }
        };
        const url = 'https://api.themoviedb.org/3/movie/'+ wrongId +'/external_ids';
        const searchRes = await axios.get(url, options);

        setImdbId(searchRes.data.imdb_id);
        console.log(ImdbId);

      } catch (error) {
        setImdbId('loading');
        console.error(error);
      }
    }
    fetchDataFindId();
  }, [wrongId]);
  
  return ImdbId;
}

export default SearchPage;
