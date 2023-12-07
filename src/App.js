import React from "react";
import ReactDOM from 'react-dom';
import './App.css';
import { useState } from 'react';
import RegisterForm from './components/register/register';
import Profile from './components/profile/profile';
import Login from './components/login/login'
import Homepage from "./components/homepage/homepage";
import Group from './components/group/group'



import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
function App() {

return(
<div>
  
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/group" element={<Group/>} />       
      </Routes>
    </BrowserRouter>
</div>
);
}
ReactDOM.render(<App />, document.getElementById('root'));

export default App;
