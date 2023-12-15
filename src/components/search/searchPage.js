import React, { useState, useEffect } from 'react';
import { MovieCardById, MovieCardByTitle, PersonCardByPerson } from './searchMovie';
import { SearchById, SearchByTitle, SearchByPerson, FindId, MovieCard, SearchByIdWithCard } from './searchMovie';
import './searchPage.css';
import { NewRating, GetRatingid, NewestRated, TopRatedMovies,GetRatingById } from '../rated/rated';
import { userInfo } from '../register/signals';
import axios from 'axios';
import { SearchResultCard } from './searchResult';
import { useParams } from 'react-router-dom';
import { Header } from '../header/Header';
import { Footer } from '../footer/footer';


function SearchPage() {

  return (
    <div>
      <Header />
      <SearchBar />
      <Footer />
    </div>
  );
}


function SearchBar() {

  const [movieData, setMovieData] = useState('');
  const [showTopRated, setShowTopRated] = useState(false);
  const [showNewestRated, setShowNewestRated] = useState(false);
  const [showGetRated, setShowGetRated] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDBID, setSearchDBID] = useState('');
  const SearchResultByTitle = SearchByTitle(searchTerm);
  const [showRatingWindow, setShowRatingWindow] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingText, setRatingText] = useState('');
  const [username, setUsername] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedGenreCodes, setSelectedGenreCodes] = useState([]);
  
  //const { searchWordHeader } = useParams();
  //console.log('searchword: '+ searchWordHeader);

  const filteredMovies = SearchResultByTitle.filter((movie) =>
    selectedGenreCodes.every((selectedGenre) => movie.genre_ids.includes(selectedGenre.code))
  );
  
  const searchFindID = FindId(searchDBID);
  const handleGenreChange = (genresCodes) => {
    setSelectedGenreCodes(genresCodes);
    console.log(genresCodes);
  }

  const handleInputChange = (event) => {
    setSearchWord(event.target.value);
  }

  function handleSearch() {
    setSearchTerm(searchWord);
    
  }

  function handleNewestRated() {
    setShowNewestRated(prevState => !prevState);
  }

  function handleTopRated() {
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



  return (
    <div className='searchpage-container'>
      <div className='searchbar-container'>
      {isEditing ? (
          <div>
            <FilterMovies closeFilter={() => setIsEditing(false)} onGenreChange={handleGenreChange} />
          </div>
        ) : (
          <img className='filter-button' src='assets/filter-icon.png' onClick={() => setIsEditing(true)} alt="filterbutton" />
        )}
  
        <input
          className='searchbar'
          type="text"
          placeholder="Search..."
          value={searchWord}
          onChange={handleInputChange}
        />
  
        <button className='search-btn' onClick={handleSearch}>Search</button>
  
        <div className='featured-buttons'>
          <button className='search-btn' onClick={handleNewestRated}>
            Newest Ratings
          </button>
          <button className='search-btn' onClick={handleTopRated}>
            Top Rated
          </button>
        </div> 
      </div>
  
    

      <div className='search-results-container'>
        <div className='selected-genres'>
          <ul className='genre-list'>
            {selectedGenreCodes.map((genre) => (
              <li key={genre.code}>{genre.name}</li>
            ))}
          </ul>
        </div>
        {showGetRated ? (

          <GetRatingById RatingById={searchFindID} />

        ) : (
          <p></p>
        )}
        {showNewestRated ? (
          <NewestRated />

        ) : (

          <p></p>
        )}
        {showTopRated ? (
          <TopRatedMovies />
        ) : (

          <p></p>
        )}

        {filteredMovies ? (
          <SearchResultCard movieData ={filteredMovies}/>
        ):(
          <p></p>
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
      <div className='filter-header'>
        <h3>Select Genre:</h3>
        <img className='exit-filter-button' src='assets/close-icon.png' alt='Close' onClick={closeFilter} />
      </div>   
      <div>
        {genreOptions.map((genre) => (
          <label key={genre.name}>
            <input
              className='checkbox'
              type='checkbox'
              value={genre.name}
              checked={selectedGenres.includes(genre.name)}
              onChange={handleGenreChange}
            />
            {genre.name}
          </label>
        ))}
      </div>
      <button className='search-btn' onClick={() => { saveSelectedGenres(); closeFilter(); }}>Save</button>
    </div>
  );
}





export { SearchPage, SearchBar };

