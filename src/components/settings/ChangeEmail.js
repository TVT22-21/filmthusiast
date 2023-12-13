import React, { useState } from 'react';
import axios from 'axios';
import { userInfo } from '../register/signals';

const ChangeEmail = ({username = userInfo.value?.private}) => {
  const [email, setNewEmail] = useState('');
  const [error, setError] = useState("");

  const handleChangeEmail = () => {
    axios.post("http://localhost:3001/person/updateemail", { email, username })
    .then((resp)=>{
    console.log(resp.data);
    console.log('Päivitetään sähköpostia...');
    setError("");
  })
    .catch((error) =>{
      console.log(error.response.data);
      console.log('Sähköpostin päivitys epäonnistui');
      setError("Sähköpostin päivitys epäonnistui.");
    });
  };

  return (
    <div>
      <h3>Vaihda Sähköposti</h3>
      <label>
        Uusi Sähköposti:
        <br />
        <input type="text" value={email} onChange={(e) => setNewEmail(e.target.value)} placeholder="Sähköposti"/>
      </label>
      <br />
      <br />
      <button onClick={handleChangeEmail}>Päivitä Sähköposti</button> 
      <br />
      <div className="text">{error}</div>
    </div>
  );
};

export default ChangeEmail;