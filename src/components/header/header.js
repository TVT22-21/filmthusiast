
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userInfo } from '../register/signals';
import { SearchBar } from '../search/searchPage';
import './header.css';

function Header() {


  return (
    
    <div class="header-container">
        <div class='searchbar-container'>
            <SearchBarHeader /> 
        </div>

        <nav>
            <Link to="/register">
                <button class='nav-btn-header'>Go to Register Page</button>
            </Link>

            <Link to={userInfo?.value?.private ? `/profile/${userInfo.value.private}` : '/profile'}>
                <button class='nav-btn-header'>Profile</button>
            </Link>
            
            <Link to="/login">
                <button class='nav-btn-header'>Login</button>
            </Link>

            <Link to="/group">
                <button class='nav-btn-header'>group</button>
            </Link>
        </nav>
        
        <img src='assets/settings-icon.png' alt="settingsbutton"/>
        
    </div>
  );
}

function SearchBarHeader(){

    const [searchWord, setSearchWord] = useState('');

    const handleInputChange = (event) => {
        setSearchWord(event.target.value);
      }
    
      function handleSearch() {
        
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


export default Header;