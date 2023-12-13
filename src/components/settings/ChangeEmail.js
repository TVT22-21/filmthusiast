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
    <div>
      <h3>Change your email</h3>
      <label>
        New email:
        <br />
        <input type="text" value={email} onChange={(e) => setNewEmail(e.target.value)} placeholder="Email"/>
      </label>
      <br />
      <br />
      <button onClick={handleChangeEmail}>Update email</button> 
      <br />
      <div className="text">{error}</div>
    </div>
  );
};

export default ChangeEmail;