import React, { useState } from 'react';
import axios from 'axios';
import { userInfo, jwtToken } from '../register/signals';

const ChangePassword = ({username=userInfo.value?.private}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setNewPassword] = useState('');

  const handleChangePassword = () => {
    axios.post("http://localhost:3001/person/updatepassword", { password, username })
      .then((resp)=>{
        console.log(resp.data);
        console.log('Changing password...');
      })
      .catch((error)=>{
        console.log(error.resp.data);
      });
  };

  function passwordCheck(){
    
  }

  return (
    <div>
      <h3>Vaihda Salasana</h3>
      <label>
        <h3> Nykyinen Salasana: </h3>
        <input type="salasana" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Nykyinen salasana"/>
      </label>
      <br />
      <label>
        Uusi Salasana:
        <input type="salasana" value={password} onChange={(e) => setNewPassword(e.target.value)} placeholder="Uusi salasana"/>
      </label>
      <br />
      <button onClick={handleChangePassword}>Vaihda Salasana:</button>
    </div>
  );
};

export default ChangePassword;