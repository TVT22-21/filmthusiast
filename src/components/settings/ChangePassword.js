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
        setError("Password updated!");
      })
      .catch((error)=>{
        console.log(error.resp.data);
        setError("Updating password failed. Current password incorrect.");
      });
  };
  

  return (
    <div>
      <h3>Change your password</h3>
      <label>
        Current password: 
        <br />
        <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current password"/>
      </label>
      <br />
      <label>
        New password:
        <br />
        <input type="password" value={password} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password"/>
      </label>
      <br />
      <br />
      <button onClick={handleChangePassword}>Change password</button>
      <br />
      <div className="text">{error}</div>
    </div>
  );
};

export default ChangePassword;