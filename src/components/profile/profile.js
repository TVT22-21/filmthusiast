
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './profile.css';
import { SearchById, SearchByTitle, SearchByPerson, MovieCardByTitle, MovieCardById, PersonCardByPerson } from '../search/searchMovie';


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
  cosnt [idList, setIdList] = useState('');
  const [watchlist, setWatchlist] = useState([]);

  function handleToggle(type) {
    setContentType(type);
    if(type == 'ratings'){
      useEffect(() => {
        async function fetchData() {
          try {
            const getWatchlistRes = await axios.get('http://localhost:3001/profile/getRatings/23')
            setWatchlist(getWatchlistRes.data);
            console.log('Response data:', getWatchlistRes.data);
    
          } catch (error) {
            setWatchlist('loading');
            console.error(error);
          }
        }
        fetchData();
      }, []);
    }
  }

  const SearchResultByTitle = SearchByTitle( 'lord of the rings' );
  const SearchResultById = SearchById( idList );
  const SearchResultByPerson = SearchByPerson( 'keanu reeves' );
  console.log(SearchResultById);

  useEffect(() => {
    async function fetchData() {
      try {
        const getWatchlistRes = await axios.get('http://localhost:3001/profile/getWatchlist/23')
        setWatchlist(getWatchlistRes.data);
        console.log('Response data:', getWatchlistRes.data);

      } catch (error) {
        setWatchlist('loading');
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <button class="content-btn" onClick={() => handleToggle('ratings')}>Movie Ratings</button>
        <button class="content-btn" onClick={() => handleToggle('watchlist')}>Watch List</button>
        <button class="content-btn" onClick={() => handleToggle('groups')}>Groups</button>
        <button class="content-btn" onClick={() => handleToggle('recent')}>Recent Activity</button>
      </div>

      {contentType === 'recent' && (
          <div>
            <h2>Recent Activity</h2>
            <div class="recent-container">
              
            </div>
          </div>
        )}  

      <div>
        {contentType === 'ratings' && (
          <div>
            <h2>Movie Ratings</h2>
            <div className="ratings-container">
              <MovieCardById movieData={SearchResultById} />        
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
              
            </div>
          </div>
        )}  

      </div>
    </div>
  );
}

function getWatchlist(){
  
}


export default Profile;

