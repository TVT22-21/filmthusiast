import './viewrated.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MovieCard, SearchById } from '../search/searchMovie';
import { SearchByIdWithCard,RatingCard } from '../search/searchMovie';

const TopRatedMovies = () => {
  const [topRated, setTopRated] = useState([]);
  const [movieData, setMovieData] = useState({});

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
      <ul className="movieList">
        {topRated.map((movie, index) => (                         
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


export default TopRatedMovies;