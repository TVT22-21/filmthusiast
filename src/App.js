import ReactDOM from "react-dom/client"
import './App.css';
import { useState } from 'react';
import RegisterForm from './components/register'
import Profile from './components/profile/profile';
import SearchPage from './components/search/searchPage';
import Login from './components/login/login'
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";


function App() {

    return(
        <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<div>Home Page</div>} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/searchPage" element={<SearchPage />} />
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
