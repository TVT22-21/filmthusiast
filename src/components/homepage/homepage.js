import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchPage from '../search/searchPage';
import Profile from '../profile/profile';
import Login from '../login/login';
import Cathegory from '../Category/CategoryButton'
import Groups from '../group/group';
import './homepage.css';

function Homepage() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);

    const categories = ["Category 1", "Category 2", "Category 3"];
  }

  return (
    
    <div className="container">
      <div className="animation-container"></div>
      <header>
        <div className="search-container">
          <h1>Filmthusiast</h1>

        </div>
      </header>

      <aside>
        <Link to="/register">
          <button>Go to Register Page</button>
        </Link>
       
       <Link to="/profile">
          <button>Profile</button>
       </Link>
     
       <Link to="/login">
        <button>Login</button>
       </Link>

       <Link to="/group">
        <button>group</button>
       </Link>
       
        <SearchPage />
      </aside>
    </div>
  );
}

export default Homepage;