import { useState } from "react";
import axios from "axios";
import {jwtToken} from './signals';
import {useNavigate} from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
    //return username.length > 0 && password.length > 0;

    function login() {
      axios.post('http://localhost:3001/postgre/person', {username, password})
        .then (resp => {jwtToken.value = resp.data.jwtToken;
        setError('');
        navigate('/');
    })
        .catch(error => {console.log(error.message);
        setError('Kirjautuminen epäonnistui. Tarkista salasana.');
      });
    }


  return (
    <div>
      {jwtToken.value.length !== 0 ? <h2>Kirjauduttu sisään</h2> :
      <div>
        <h2>Kirjaudu sisään</h2>
        <input type="username" onChange={e => setUsername(e.target.value)} placeholder='Käyttäjätunnus'/><br/>
        <input type="password" onChange={e => setPassword(e.target.value)} placeholder='Salasana'/><br/>
        <button onClick={login}>Kirjaudu sisään</button>
      </div>
    }
    </div>
)
}