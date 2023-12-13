
import React from "react";
import ReactDOM from 'react-dom';
import './App.css';
import { useState } from 'react';
import RegisterForm from './components/register/register';
import Profile from './components/profile/profile';
import { SearchPage } from "./components/search/searchPage";
import Login from './components/login/login';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Homepage from "./components/homepage/homepage";
import Group from './components/group/group'


function App() {


return(
<div>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/group" element={<Group/>} /> 
      </Routes>
    </BrowserRouter>
</div>
);
}
ReactDOM.render(<App />, document.getElementById('root'));
//test

export default App;
