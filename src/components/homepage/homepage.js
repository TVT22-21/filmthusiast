import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchPage } from '../search/searchPage';
import Profile from '../profile/profile';
import Login from '../login/login';
import Cathegory from '../Category/CategoryButton';
import Groups from '../group/group';
import './homepage.css';
import { userInfo } from '../register/signals';
import { NewestRated, TopRatedMovies } from '../rated/rated';
import { Header } from '../header/Header';

function Homepage() {

  

  return (
    
    <div className="container">
      <Header />
      <NewestRated />
      <TopRatedMovies />
    </div>
  );
}

export default Homepage;