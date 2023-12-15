import React, { useState } from 'react';
import axios from 'axios';
import { userInfo } from '../register/signals';
import './settings.css';

const ChangePassword = ({username=userInfo.value?.private}) => {
  //const [currentPassword, setCurrentPassword] = useState('');
  const [password, setNewPassword] = useState('');
  const [error, setError] = useState("");

  const handleChangePassword = () => {
    axios.post("/person/updatepassword", { password, username })
      .then((resp)=>{
        console.log(resp.data);
        console.log('Changing password...');
        setError("Password updated!");
      })
      .catch((error)=>{
        console.log(error.response.data);
        setError("Updating password failed.");
      });
  };
  

  return (
    <div className="setting">
      <h3>Change your password</h3>
      {/*<label>
        Current password: 
        <br />
        <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current password"/>
      </label>
      <br />*/}
      <br/>
        <label>
          <input type="password" value={password} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password"/>
          <button className="settings-btn" onClick={handleChangePassword}>Update Password</button>
        </label>
      <br/>
      <div className="h3">{error}</div>
    </div>
  );
};

export default ChangePassword;