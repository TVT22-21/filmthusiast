import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './profile.css';

import { SearchById, SearchByTitle, SearchByPerson, MovieCardByTitle, MovieCardById, PersonCardByPerson, SearchByIdWithCard } from '../search/searchMovie';
import { SearchPage } from '../search/searchPage';
import { jwtToken, userInfo } from '../register/signals';

import {useParams} from 'react-router-dom';

function Profile(){
  return (
    <div>
      <Body />
    </div>
  )
};

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
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const { username } = useParams();

  
  useEffect(() => {
    async function fetchData() {
      try {
        //const uName = userInfo.value?.private;
        //console.log(uName);

        const getProfRes = await axios.get('http://localhost:3001/profile/getProfile/'+ username);
        
        console.log('Response data:', getProfRes.data);
        setProfile(getProfRes.data);
      } catch (error) {
        setProfile('loading');
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleSubmitTitle = async () => {
    try {
      const personId = profile.person_idperson; 
      console.log(personId);
      await axios.put('http://localhost:3001/profile/updateTitle', {
        profiletitle: newTitle,
        person_idperson: personId,
      });
      
      setProfile((prevProfile) => [
        {
          ...prevProfile[0],
          profiletitle: newTitle,
        },
      ]);

      setIsEditingTitle(false);

    } catch (error) {
      console.error('Error updating title:', error);
    }
  };

  const handleEditDesc = () => {
    setIsEditingDesc(true);
  };

  const handleDescChange = (e) => {
    setNewDesc(e.target.value);
  };

  const handleSubmitDesc = async () => {
    try {
      const personId = profile.person_idperson; 
      await axios.put('http://localhost:3001/profile/updateDescription', {
        description: newDesc,
        person_idperson: personId,
      });
      
      setProfile((prevProfile) => [
        {
          ...prevProfile[0],
          description: newDesc,
        },
      ]);

      setIsEditingDesc(false);

    } catch (error) {
      console.error('Error updating description:', error);
    }
  };

  return(   
  
    <div>  
      {profile.map((name) => (
        <div class="name-container" key={name.idprofile}>
          <p>
            {name.firstname} {name.lastname}
          </p>
        </div>
      ))}
      {profile.map((profinf) => (
        <div class="info-container" key={profinf.idprofile}>
          <div class="profile-title-container">
            {isEditingTitle ? (
              <div>
                <input
                  type="text"
                  value={newTitle}
                  onChange={handleTitleChange}
                  placeholder="Enter new title"
                />
                <button onClick={handleSubmitTitle}>Submit</button>
              </div>
            ) : (
              <div class='profile-title-container'> 
                <h1>{profinf.profiletitle}</h1>
                <img src='assets/edit-icon.png' onClick={handleEditTitle} alt="editbutton" />
              </div>
            )}
          </div>
          <div class="profile-desc-container">
            {isEditingDesc ? (
              <div>
                <input
                  type="text"
                  value={newDesc}
                  onChange={handleDescChange}
                  placeholder="Enter new description"
                />
                <button onClick={handleSubmitDesc}>Submit</button>
              </div>
            ) : (
              <div class='profile-desc-container'>
                <p>{profinf.description}</p>
                <img src='assets/edit-icon.png' onClick={handleEditDesc} alt="editbutton" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}


function Content(){

  const [contentType, setContentType] = useState('ratings');
  const [ratings, setRatings] = useState('');
  const [ratingIds, setRatingIds] = useState('');

  const { username } = useParams();

  function handleToggle(type) {
    setContentType(type);
  }

  const SearchResultByTitle = SearchByTitle( 'lord of the rings' );

  useEffect(() => {
 
    async function fetchDataRatings() {
      try {
        //const uName = userInfo.value?.private;
        //const uName = 'niilo';
        //console.log(uName);
        const response = await axios.get(`http://localhost:3001/rating/getrating?username=${username}`);
        setRatings(response.data);
        
      } catch (error) {
        setRatings('loading');
        console.error(error);
      }
    }

    fetchDataRatings();
  }, []);

  return (
    <div>
      <div class='content-nav'>
        <button class="content-btn" onClick={() => handleToggle('ratings')}>Movie Ratings</button>
        <button class="content-btn" onClick={() => handleToggle('watchlist')}>Watch List</button>
        <button class="content-btn" onClick={() => handleToggle('groups')}>Groups</button>
      </div>
      
      <div>
        {contentType === 'ratings' && (
          <div>
            <h2>Movie Ratings</h2>
            <div class="ratings-container">
              {Array.isArray(ratings) ? (
                ratings.map((rating) => (
                  <div class='movie-rating-card' key={rating.idrated}>
                  <div>
                    <SearchByIdWithCard movieId={ rating.idmovie } />
                  </div>
                  <div class='movie-rating'>
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
            <Watchlist />
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

function Watchlist(){

  const [watchlist, setWatchlist] = useState([]);

  const { username } = useParams();

  useEffect(() => {
    
    async function fetchDataRatings() {
      try {
        //const uName = userInfo.value.private;
        const response = await axios.get(`http://localhost:3001/profile/getWatchlist/`+ username);
        setWatchlist(response.data[0].watchlist);
        console.log(response.data[0].watchlist);

      } catch (error) {
        setWatchlist('loading');
        console.error(error);
      }
    }

    fetchDataRatings();
  }, []);

  return(
    <div>
      <h2>Watch List</h2>
      <div class="watchlist-container">
        {watchlist.length > 0 ? (
          watchlist.map((movieId) => (
            <div key={movieId}>
              <SearchByIdWithCard movieId={movieId} />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;

