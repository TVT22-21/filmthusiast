import '../search/searchPage.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchById } from '../search/searchMovie';

const TopRatedMovies = () => {
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3001/rating/toprating');
        const movies = response.data;

        const validMovies = movies.filter(movie => typeof movie.rating === 'number');

        const sortedMovies = validMovies.sort((a, b) => b.rating - a.rating);

        const TopRatedMovies = sortedMovies.slice(0, 5);
        setTopRated(TopRatedMovies);
      } catch (error) {
        console.error('Error fetching newest-rated movies:', error.message);
      }
    };

    fetchTopRatedMovies();
  }, []);

  return (
    <div>
      <h2>Top 5 Rated Movies</h2>
      <ul>
        {topRated.map((movie, index) => (
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


export default TopRatedMovies;