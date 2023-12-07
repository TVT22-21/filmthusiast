import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './profile.css';
import { SearchById, SearchByTitle, SearchByPerson, MovieCardByTitle, MovieCardById, PersonCardByPerson } from '../search/searchMovie';
import { GetRating } from '../rated/rated';

function Profile() {
  return (
    <div>
      <Body />
    </div>
  );
}

function Body(){

  return(
    <div>
      <Main />
    </div>
  );
}

function Main(){

  return(
    <main>
      <Information /> 
      <Content /> 
    </main>
  );
}

function Information(){

  const [profile, setProfile] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const getProfRes = await axios.get('http://localhost:3001/profile/getProfile/8')
        setProfile(getProfRes.data);
        console.log('Response data:', getProfRes.data);

      } catch (error) {
        setProfile('loading');
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return(   

    <div>
      {profile.map((name) => (
        <div class="name-container" key={name.idprofile}> 
          <p>{name.firstname} {name.lastname}</p>
        </div>
      ))}

     {profile.map((profinf) => (
        <div class="info-container" key={profinf.idprofile}> 
          <h1>{profinf.profiletitle}</h1>
          <p>{profinf.description}</p>
        </div>
      ))}
    
    </div>
  )  
}

function Content(){

  const [contentType, setContentType] = useState('ratings');
  const [watchlist, setWatchlist] = useState([]);
  const [ratings, setRatings] = useState('');

  function handleToggle(type) {
    setContentType(type);
  }

  const SearchResultByTitle = SearchByTitle( 'lord of the rings' );
  const SearchResultById = SearchById( 'tt0120338' );
  const SearchResultByPerson = SearchByPerson( 'keanu reeves' );
  //const RatingsByName = GetRating( 'Seppo' );

  useEffect(() => {
    
    async function fetchData() {
      try {
        const getWatchlistRes = await axios.get('http://localhost:3001/profile/getWatchlist/23')
        setWatchlist(getWatchlistRes.data);

      } catch (error) {
        setWatchlist('loading');
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:3001/rating/getrating?username=Seppo`);
        setRatings(response.data);
        console.log(response);

      } catch (error) {
        setRatings('loading');
        console.error(error);
      }
    }
    fetchData();
  }, []);
  
  return (
    <div>
      <div className='content-nav'>
        <button class="content-btn" onClick={() => handleToggle('ratings')}>Movie Ratings</button>
        <button class="content-btn" onClick={() => handleToggle('watchlist')}>Watch List</button>
        <button class="content-btn" onClick={() => handleToggle('groups')}>Groups</button>
        <button class="content-btn" onClick={() => handleToggle('recent')}>Recent Activity</button>
      </div>

      {contentType === 'recent' && (
          <div>
            <h2>Recent Activity</h2>
            <div class="recent-container">
              <MovieCardByTitle movieData={SearchResultByTitle} />
              <MovieCardByTitle movieData={SearchResultByTitle} />
              <MovieCardByTitle movieData={SearchResultByTitle} />
            </div>
          </div>
        )}  

      <div>
        {contentType === 'ratings' && (
          <div>
            <h2>Movie Ratings</h2>
            <div className="ratings-container">
              {Array.isArray(ratings) ? (
                ratings.map((rating) => (
                  <div className='movie-rating-card' key={rating.idrated}>
                  <div>
                    <MovieCardById movieData={SearchResultById} />
                  </div>
                  <div className='movie-rating'>
                    <p><strong>My Rating: </strong>{rating.rating}</p>
                    <p><strong>Date: </strong>{new Date(rating.ratingdate).toLocaleString()}</p>
                    <p>{rating.ratingtext}</p>
                    <p><strong>idmovie: </strong>{rating.idmovie}</p>
                  </div>
                    
                  </div>
              ))
              ) : (
              <p>Loading...</p>
              )}
            </div> 
          </div>
        )}

        {contentType === 'watchlist' && (
          <div>
            <h2>Watch List</h2>
            <div class="watchlist-container">
            </div>
          </div>
        )}

        {contentType === 'groups' && (
          <div>
            <h2>Groups</h2>
            <div class="groups-container">
              <MovieCardByTitle movieData={SearchResultByTitle} />
              <MovieCardByTitle movieData={SearchResultByTitle} />
              <MovieCardByTitle movieData={SearchResultByTitle} />
            </div>
          </div>
        )}  

      </div>
    </div>
  );
}


export default Profile;
