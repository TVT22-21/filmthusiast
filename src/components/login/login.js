import { useState } from "react";
import axios from "axios";
import {jwtToken, userInfo} from '../register/signals';
import {useNavigate} from "react-router-dom";
import './login.css';


export default function Login(){
  return(
    <div>
      <UserInfo/>
      { jwtToken.value.length === 0 ? <LoginForm/> :
        <button onClick={() => jwtToken.value = ''}>Kirjaudu ulos</button>}
    </div>
  )
}

function UserInfo(){
  return(
    <div>
      {jwtToken.value ? <h1>{userInfo.value?.private}</h1> : <h1>Olet vierailijana</h1>}
    </div>
  )
}

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();
    //return username.length > 0 && password.length > 0;

    function login() {
      axios.post("http://localhost:3001/login/login", { username, password })
        .then((resp) => {
          console.log(resp.data);
          jwtToken.value = resp.data.jwtToken;
          navigate("/");
          setError("");
        })
        .catch((error) => {
          console.log(error.response.data); 
          setError("Kirjautuminen epäonnistui. Tarkista salasana.");
        });
    }


    return (
      <div className="login-container">
        <div className="login">
          <div className="header">
            <div className="text">Kirjaudu sisään</div>
          </div>
          {jwtToken.value.length !== 0 ? (
            <h2>Kirjauduttu sisään</h2>
          ) : (
            <div>
              <div className="inputs">
                <div className="input">
                  <input
                    type="username"
                    onChange={(e) => setUsername(e.target.value)} placeholder="Käyttäjätunnus"
                  />
                  <br />
                  <div className="input">
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)} placeholder="Salasana"
                  />
                </div>
                </div>
                <br />
                <div>
                  <button onClick={login}>Kirjaudu sisään</button>
                </div>
                <br />
                <div className="text">{error}</div>
              </div>
            </div>
          )}
        </div>
      </div>  
    );
  }