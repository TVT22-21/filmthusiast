
import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Profile.css';


function Profile() {
  return (
    <div>
      <Body />
    </div>
  );
}

function Body(){

  return(
    <body>
      <Main />
    </body>
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
        const response = await axios.get('http://localhost:3001/profile/getProfile/8')
        setProfile(response.data);
        console.log('Response data:', response.data);
      } catch (error) {
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

  function handleToggle(type) {
    setContentType(type);
  }

  return (
    <div>
      <div>
        <button class="content-btn" onClick={() => handleToggle('ratings')}>Movie Ratings</button>
        <button class="content-btn" onClick={() => handleToggle('watchlist')}>Watch List</button>
      </div>

      <div>
        {contentType === 'ratings' && (
          <div>
            <h2>Movie Ratings</h2>
          </div>
        )}

        {contentType === 'watchlist' && (
          <div>
            <h2>Watch List</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;

