
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userInfo, jwtToken,  } from '../register/signals';

import './header.css';

function Header() {
  const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState(false);
    //if(userInfo?.value.private){
    //    setLoggedIn(true);
    //}
    function logOut(){
      jwtToken.value = '';
      console.log("logged out");
      window.location.reload(false);
    }

    return (
        <div class="header-container">
          <div class='searchbar-container'>
            <SearchBarHeader />
          </div>
    
          <nav>   
            {!userInfo?.value?.private ? null : (     
                <Link to={`/profile/${userInfo.value.private}`}>
                    <button class='nav-btn-header-profile'>{userInfo?.value?.private}</button>
                </Link>             
            )}

            <Link to="/group">
              <button class='nav-btn-header'>group</button>
            </Link>

            {!userInfo?.value?.private ? null : (
                    <button onClick={logOut} class='nav-btn-header'>Logout</button>
            )}

            {userInfo?.value?.private ? null : (
              <>
                <Link to="/login">
                  <button class='nav-btn-header'>Login</button>
                </Link>
    
                <Link to="/register">
                  <button class='nav-btn-header'>Register</button>
                </Link>
              </>
            )}
          </nav>
          <button class='settings-btn-header'><img src='assets/settings-icon.png' alt="settingsbutton"/></button>
        </div>
      );
  }
  
function SearchBarHeader(){
  
    const [searchWord, setSearchWord] = useState('');
    const navigate = useNavigate();
  
    const handleInputChange = (event) => {
        setSearchWord(event.target.value);
    }
    
    function handleSearch() {
        navigate(`/searchPage?query=${searchWord}`);
        console.log('asdasdasdasjooooooooooooo'+ userInfo?.value.private);
    }
  
    return (
        <div class='search-container'>
            <div class='search-bar-container'>
                <input
                class='search-bar'
                type="text"
                placeholder="Search..."
                value={searchWord}
                onChange={handleInputChange}
                />
        
                <button class='search-btn-header' onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
  }


export { Header };