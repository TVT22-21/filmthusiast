import React, { useState } from 'react';
import axios from 'axios';
import { userInfo } from '../register/signals';

const ChangePassword = ({username=userInfo.value?.private}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setNewPassword] = useState('');
  const [error, setError] = useState("");

  const handleChangePassword = () => {
    axios.post("http://localhost:3001/person/updatepassword", { password, username, currentPassword })
      .then((resp)=>{
        console.log(resp.data);
        console.log('Changing password...');
        setError("");
      })
      .catch((error)=>{
        console.log(error.resp.data);
        setError("Salasanan vaihtaminen epäonnistui.");
      });
  };
  

  return (
    <div>
      <h3>Vaihda Salasana</h3>
      <label>
        Nykyinen Salasana: 
        <br />
        <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Nykyinen salasana"/>
      </label>
      <br />
      <label>
        Uusi Salasana:
        <br />
        <input type="password" value={password} onChange={(e) => setNewPassword(e.target.value)} placeholder="Uusi salasana"/>
      </label>
      <br />
      <br />
      <button onClick={handleChangePassword}>Vaihda Salasana</button>
      <br />
      <div className="text">{error}</div>
    </div>
  );
};

export default ChangePassword;