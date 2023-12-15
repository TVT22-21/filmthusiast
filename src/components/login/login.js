import { useState } from "react";
import axios from "axios";
import {jwtToken, userInfo} from '../register/signals';
import {useNavigate} from "react-router-dom";
import './login.css';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";


export default function Login(){
  return(
    <div>
      <Header />
      { jwtToken.value.length === 0 ? <LoginForm/> :
        <button onClick={() => jwtToken.value = ''}>Kirjaudu ulos</button>}
      <Footer/>
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
      axios.post("/login/login", { username, password })
        .then((resp) => {
          console.log(resp.data);
          jwtToken.value = resp.data.jwtToken;
          navigate("/");
          setError("");
        })
        .catch((error) => {
          console.log(error.response.data); 
          setError(<div>Kirjautuminen epäonnistui.<br/>Tarkista salasana!</div>);
        });
    }

    function navigateToRegister(){
      navigate("/register");
    }

    return (
      <div className="login-container">
        <div className="login">
          <div className="header">
            <div className="text">Kirjaudu sisään</div>
          </div>
          {jwtToken.value.length !== 0 ? (
            <h3>Kirjauduttu sisään</h3>
          ) : (
            <div>
              <div className="inputs">
                <div className="input">
                  <input
                    type="username"
                    onChange={(e) => setUsername(e.target.value)} placeholder="Käyttäjätunnus"
                  />
                  <br />
                  </div>
                  <div className="input">
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)} placeholder="Salasana"
                  />
                  </div>

                
                <div className="text">{error}</div>
                <div>
                  <button className="login-btn" onClick={login}>Kirjaudu sisään</button>
                  <br/>
                    <div className="header">
                      <div className="text">Etkö omista käyttäjää?</div>
                      <button className="login-btn" onClick={navigateToRegister}>Rekisteröidy käyttäjäksi</button>
                      <br/>
                    </div>
                </div>
                <br />
              </div>
            </div>
          )}
        </div>
      </div>  
    );
  }