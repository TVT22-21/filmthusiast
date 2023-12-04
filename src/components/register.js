import { useState } from "react";
import axios from "axios";
import './register.css';

export default function RegisterForm() {

    const [username, setUname] = useState('');
    const [password, setPw] = useState('');
    const [pw2, setPw2] = useState('');
    const [email, setEmail] = useState('');
    const [virhe, setVirhe] = useState('');

    function register() {
        console.log('Before registration:', { username, password, email });
      
        if (password === pw2) {
          axios.post('http://localhost:3001/person/register', { username, password, email })
            .then(resp => {
              console.log('Registration response:', resp.data);
      
              if (resp.data.message) {
                setVirhe(resp.data.message);
              } else {
                setVirhe('Rekisteröinti onnistui!');
              }
            })
            .catch(error => {
              console.log('Registration error:', error.response.data);
              setVirhe(error.response.data.error || 'Rekisteröinti epäonnistui');
            });
        } else {
          setVirhe('Salasanat eivät täsmää');
        }
      };
      

    return (
        <div className="register">
            <div className="header">
                <div className="text">Rekisteröidy käyttäjäksi</div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="text" value={username} onChange={e => setUname(e.target.value)} placeholder="Käyttäjätunnus" />
                </div>
                <div className="input">
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Sähköposti" />
                </div>
                <div className="input">
                    <input type="password" value={password} onChange={e => setPw(e.target.value)} placeholder="Salasana" />
                </div>
                <div className="input">
                    <input type="password" value={pw2} onChange={e => setPw2(e.target.value)} placeholder="Vahvista Salasana" />
                </div>
            </div>
            <div className="texti">{virhe}</div>
            <div class="footer">
                <div className="nappi" onClick={register}>Rekisteröidy</div>
                <div className="nappi">Kirjaudu</div>
            </div>
        </div>


    )
}