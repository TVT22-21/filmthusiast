import { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchByIdWithCard,RatingCard } from '../search/searchMovie';
import './rated.css';


const NewRating = async (idmovie, rating, ratingtext, username) => {
  try {
    const response = await axios.post('http://localhost:3001/rating/addrating', {
      idmovie,
      rating,
      ratingtext,
      username,
    });

    console.log('Rating response:', response.data);

    if (response.data.message) {
      return Promise.reject(response.data.message);
    } else {
      return Promise.resolve('Arvostelu onnistui!');
    }
  } catch (error) {
    if (error.response) {
      console.log('Rating error:', error.response.data);
      return Promise.reject(error.response.data.error || 'Arvostelu epäonnistui');
    } else if (error.request) {
      console.log('Network error:', error.request);
      return Promise.reject('Verkkovirhe, yritä uudelleen myöhemmin');
    } else {
      console.error('Error message:', error.message);
      return Promise.reject('Arvostelu epäonnistui');
    }
  }
};

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

const GetRatingById = ({RatingById}) => {
  
  const [GetRatedMovies, setGetRatedMovies] = useState([]);
  const [movieData, setMovieData] = useState({});
  console.log('asd', RatingById);

  useEffect(() => {
    const fetchGetRatedMovies = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/rating/getrating/idmovie?idmovie=${RatingById}`);
        const movies = response.data;
        setGetRatedMovies(movies);
      } catch (error) {
        console.error('Error fetching newest-rated movies:', error.message);
      }
    };

    fetchGetRatedMovies();
  }, [RatingById]);


  return (
    <div>
      <ul className="movieList">
        {GetRatedMovies.map((movie, index) => (                         
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

const GetRatingid2 = ({searchDBID}) => {
  const [RatedMovies, setRatedMovies] = useState([]);
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    const fetchNewestRatedMovies = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/rating/getrating/idmovie?idmovie=${searchDBID}`);
        const movies = response.data;
        setRatedMovies(RatedMovies);
      } catch (error) {
        console.error('Error fetching newest-rated movies:', error.message);
      }
    };

    fetchNewestRatedMovies();
  }, []);


  return (
    <div>
      <ul className="movieList">
        {RatedMovies.map((movie, index) => (                         
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
    const GetRatingid = async (idmovie) =>{
      const [data, setData] = useState([]);
      const [idmovieparam, setIdmovieparam] = useState('');
      axios.get(`http://localhost:3001/rating/getrating/idmovie?idmovie=${idmovie}`)
        .then(resp => {
            console.log('Response:', resp.data);
            setData(resp.data);
            return data;
        })
        .catch(error => console.log(error.message))

    };

    function GetRating(username){
      const [usernameparam, setUnameparam] = useState('');
      const [data, setData] = useState([]);
        axios.get(`http://localhost:3001/rating/getrating?username=${username}`)
        .then(resp => {
            console.log('Response:', resp.data);
            setData(resp.data);
            return data;
        })
        .catch(error => console.log(error.message))

    };

    function GetRatingrating(rating){
      const [ratingparam, setRatingparam] = useState('');
      const [data, setData] = useState([]);
        axios.get(`http://localhost:3001/rating/getrating/rating?rating=${rating}`)
        .then(resp => {
            console.log('Response:', resp.data);
            setData(resp.data);
            return data;
        })
        .catch(error => console.log(error.message))

    };

    



    export {NewRating, GetRatingById, NewestRated, TopRatedMovies};

