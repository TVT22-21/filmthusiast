
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userInfo, jwtToken  } from '../register/signals';

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
          <img src='assets/filmthusiast-log.png' alt='logo' />
          <div class='searchbar-container'>
            <SearchBarHeader />
          </div>
    
          <nav>   
            {!userInfo?.value?.private ? null : (     
                <Link to={`/profile/${userInfo.value.private}`}>
                    <button class='nav-btn-header'>{userInfo?.value?.private}</button>
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
          <Link to="/settings">
                <button class='nav-btn-header'><img src='assets/settings-icon2.png' alt="settingsbutton"/></button>
          </Link>
          
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
        navigate(`/searchPage`);
    }
  
    return (
        <div class='search-container-header'>
            <div class='search-bar-container-header'>
                <input
                class='search-bar'
                type="text"
                placeholder="Search..."
                value={searchWord}
                onChange={handleInputChange}
                />
                <button class='nav-btn-header' onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
  }


export { Header };