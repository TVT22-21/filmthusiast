import ReactDOM from "react-dom/client"
import './App.css';
import { useState } from 'react';
import RegisterForm from './components/register'
import Profile from './components/profile/profile';
import SearchPage from './components/search/searchPage';
import Login from './components/login/login'
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import NewestRated from "./components/viewrated/newest";
import TopRatedMovies from "./components/viewrated/toprated";


function App() {

    return (
        <div>
            <NewestRated />
            <TopRatedMovies />
        </div>
    )
}

export default App;
