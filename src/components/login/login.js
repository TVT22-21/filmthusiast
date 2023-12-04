import { useState } from "react";
import axios from "axios";
import {jwtToken} from '../signals';
import {useNavigate} from "react-router-dom";
import './login.css';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();
    //return username.length > 0 && password.length > 0;

    function login() {
      setError("");
      axios.post("http://localhost:3001/postgre/person", { username, password })
        .then((resp) => {
          jwtToken.value = resp.data.jwtToken;
          navigate("/");
        })
        .catch((error) => {
          console.error(error); 
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