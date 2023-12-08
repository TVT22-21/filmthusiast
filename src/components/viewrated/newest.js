import '../search/searchPage.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchById } from '../search/searchMovie';

const NewestRated = () => {
  const [newestRatedMovies, setNewestRatedMovies] = useState([]);

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
      <ul>
        {newestRatedMovies.map((movie, index) => (
          <li key={index}>
            {movie.idmovie} - 
            Rating: {movie.rating} - 
            {movie.ratingtext} - 
            {movie.ratingdate} - 
            {movie.username}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default NewestRated;