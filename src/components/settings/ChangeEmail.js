import React, { useState } from 'react';
import axios from 'axios';
import { userInfo } from '../register/signals';
import './settings.css';

const ChangeEmail = ({username = userInfo.value?.private}) => {
  const [email, setNewEmail] = useState('');
  const [error, setError] = useState("");

  const handleChangeEmail = () => {
    axios.post("http://localhost:3001/person/updateemail", { email, username })
    .then((resp)=>{
    console.log(resp.data);
    console.log('Updating email...');
    setError("Email updated!");
  })
    .catch((error) =>{
      console.log(error.response.data);
      console.log('Sähköpostin päivitys epäonnistui');
      setError("Updating email failed.");
    });
  };

  return (
    <div className="setting">
      <h3>Change your email</h3>
      <br/>
      <label className="settings-label">
        <input type="text" value={email} onChange={(e) => setNewEmail(e.target.value)} placeholder="New Email"/>
        <button className="settings-btn" onClick={handleChangeEmail}>Update Email</button> 
      </label>
      <br />
      <div className="h3">{error}</div>
    </div>
  );
};

export default ChangeEmail;