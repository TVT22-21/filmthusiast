import './App.css';
import { useState } from 'react';
import { LoginContext } from "./Components/Context";
import { Login } from './Components/Auth';

function App() {
  const [login, setLogin] = useState(false);

  return (
    <LoginContext.Provider value={(login,setLogin)}>
      <h4>Arvo on {login.toString()}</h4>
      <Login/>
      </LoginContext.Provider>
  );
}

export default App;