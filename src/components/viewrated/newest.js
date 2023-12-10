import './viewrated.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MovieCard, SearchById } from '../search/searchMovie';
import { SearchByIdWithCard, RatingCard } from '../search/searchMovie';

const NewestRated = () => {
  const [newestRatedMovies, setNewestRatedMovies] = useState([]);
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    const fetchNewestRatedMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3001/rating/newestrating');
        const movies = response.data;

        const validMovies = movies.filter(movie => typeof movie.rating === 'number');

        const sortedMovies = validMovies.sort((a, b) => new Date(b.ratingdate) - new Date(a.ratingdate));

        const newestRatedMovies = sortedMovies.slice(0, 5);
        setNewestRatedMovies(newestRatedMovies);
      } catch (error) {
        console.error('Error fetching newest-rated movies:', error.message);
      }
    };

    fetchNewestRatedMovies();
  }, []);


  return (
    <div>
      <h2>Top 5 Newest Rated Movies</h2>
      <ul className="movieList">
        {newestRatedMovies.map((movie, index) => (                         
          <li key={index} className="movieListItem">
            <div className="movieCardContainer">
              <SearchByIdWithCard movieId={movie.idmovie}/>
              <RatingCard RatingData={{
                username: movie.username,
                rating: movie.rating,
                ratingtext: movie.ratingtext,
                ratingdate: movie.ratingdate,
              }}/>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default NewestRated;