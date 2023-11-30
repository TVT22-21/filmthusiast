import { useState } from "react";
import axios from "axios";
import {jwtToken} from './signals';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    //return username.length > 0 && password.length > 0;

    function login() {
      axios.postForm('/postgre/person', {username, password})
        .then (resp => jwtToken.value = resp.data.jwtToken)
        .catch(error => console.log(error.message))
    }


  return (
    <div>
      {jwtToken.value.length !== 0 ? <h2>Kirjauduttu sisään</h2> :
      <div>
        <h2>Login</h2>
        <input onChange={e => setUsername(e.target.value)}/><br/>
        <input onChange={e => setPassword(e.target.value)}/><br/>
        <button onClick={login}>Kirjaudu sisään</button>
      </div>
    }
    </div>
)
}