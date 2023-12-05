
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './searchPage.css';

function SearchById( movieId ){
  
    const [searchMovie, setSearch] = useState([]);

    useEffect(() => {
      async function fetchData() {
        try {      
          const options = {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NGNmYzA4ZGVhMTAwZTM5OWQ4N2I4NTNlNzViMWZmNCIsInN1YiI6IjY1NjViYzVmYzJiOWRmMDEzYWUzZDU2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rrVdXNYoMFrO2zTlNB55yGjWUPfw3SmiJ4QnKhIbhX0'
            },
            params: {
                external_source: 'imdb_id',
            }
            };

          const url = `https://api.themoviedb.org/3/find/${movieId}`;

          const searchRes = await axios.get(url, options);
          console.log(searchRes);
          setSearch(searchRes.data.movie_results);
          console.log('Response data:', searchRes.data.movie_results);
  
        } catch (error) {
          setSearch('loading');
          console.error(error);
        }
      }
      fetchData();
    }, [movieId]);
  
    return searchMovie;
};


function SearchByTitle(movieTitle) {
  const [searchResult, setResult] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const options = {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NGNmYzA4ZGVhMTAwZTM5OWQ4N2I4NTNlNzViMWZmNCIsInN1YiI6IjY1NjViYzVmYzJiOWRmMDEzYWUzZDU2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rrVdXNYoMFrO2zTlNB55yGjWUPfw3SmiJ4QnKhIbhX0',
          },
          params: {
            query: movieTitle,
          },
        };
        const url = 'https://api.themoviedb.org/3/search/movie';
        const searchRes = await axios.get(url, options);

        setResult(searchRes.data.results);
        console.log('Response data:', searchRes.data.results);
      } catch (error) {
        setResult('loading');
        console.error(error);
      }
    }
    fetchData();
  }, [movieTitle]);

  return searchResult;
}


function SearchByPerson( person ){
  
  const [searchPerson, setSearch] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {      
        const options = {
          headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NGNmYzA4ZGVhMTAwZTM5OWQ4N2I4NTNlNzViMWZmNCIsInN1YiI6IjY1NjViYzVmYzJiOWRmMDEzYWUzZDU2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rrVdXNYoMFrO2zTlNB55yGjWUPfw3SmiJ4QnKhIbhX0'
          },    
          params: {
            query: person
          }
          };
        
        const url = `https://api.themoviedb.org/3/search/person`;

        const searchRes = await axios.get(url, options);

        setSearch(searchRes.data.results);
        console.log('Response data:', searchRes.data.results);

      } catch (error) {
        setSearch('loading');
        console.error(error);
      }
    }
    fetchData();
  }, [person]);

  return searchPerson;
};

  
function MovieCardById({movieData}){
  //console.log(movieData);
  return (
    <div>
      {Array.isArray(movieData) ? (
        movieData.map((searchdata) => (
          <div className='movie-card' key={searchdata.id}>
            {searchdata.poster_path && (
              <img src={`https://images.tmdb.org/t/p/w200${searchdata.poster_path}`} alt={`Poster for ${searchdata.title}`} />
            )}
            <p><strong>Rating: </strong>7.5</p>
            <p><strong>{searchdata.original_title}</strong></p>
            <p><strong>Release Date: </strong>{searchdata.release_date}</p>
            <p><strong>Media type: </strong>{searchdata.media_type}</p>
          </div>
      ))
      ) : (
      <p>Loading...</p>
      )}
    </div>
  );
};

function MovieCardByTitle({movieData}){
  return (
    <div>
      {Array.isArray(movieData) ? (
        movieData.map((searchdata) => (
          <div className='movie-card' key={searchdata.id}>
            {searchdata.poster_path && (
              <img src={`https://images.tmdb.org/t/p/w200${searchdata.poster_path}`} alt={`Poster for ${searchdata.title}`} />
            )}
            <p><strong>Rating: </strong>7.5</p>
            <p><strong>{searchdata.original_title}</strong></p>
            <p><strong>Release Date: </strong>{searchdata.release_date}</p>
            
          </div>
      ))
      ) : (
      <p>Loading...</p>
      )}
      
    </div>
  );
};


function PersonCardByPerson({movieData}){
  return (
    <div>
      {Array.isArray(movieData) ? (
      movieData.map((searchdata) => (
        <div className='movie-card' key={searchdata.id}>
          {searchdata.poster_path && (
            <img src={`https://images.tmdb.org/t/p/w200${searchdata.profile_path}`} alt={`Poster for ${searchdata.title}`} />
          )}
          <p><strong>Name: </strong>{searchdata.name}</p>
          <p><strong>Known for: </strong>{searchdata.known_for_department}</p>
          
        </div>
      ))
      ) : (
      <p>Loading...</p>
      )}
    </div>
  );
};

export { SearchById, SearchByTitle, SearchByPerson, MovieCardById, MovieCardByTitle, PersonCardByPerson };
