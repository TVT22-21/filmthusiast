import ReactDOM from "react-dom/client"
import './App.css';
import { useState } from 'react';
import RegisterForm from './components/register'
import Login from './components/login'
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
function App() {

return(
<div>
    <RegisterForm/>
</div>
)
}
export default App;