import React, { useState } from 'react';
import axios from 'axios';
import { userInfo, jwtToken } from '../register/signals';
import './settings.css';
//import { useNavigate } from 'react-router';


const UserProfile = ({ username= userInfo.value?.private }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    //const navigate = useNavigate();

    
function handleDelete(){
  axios.post("http://localhost:3001/person/delete", { username, password })
    .then((resp)=>{
    console.log(resp.data);
    setError("Account deleted.");
    deleteSuccess();
  })
    .catch((error) => {
      console.log(error.response.data);
      console.log('Account delete failed');
      setError("Account delete failed. Password incorrect.");
    });
}

    function deleteSuccess() {
      jwtToken.value = '';
      console.log('Account deleted succesfully. Logged out');
      window.location.reload(false);
      }
      

    const toggleConfirmation = () => {
      setShowConfirmation(!showConfirmation);
    };

  return (
    <div className="setting">
      <label>
        <h3>Delete your account: {username}</h3>
        <button className="settings-btn" onClick={toggleConfirmation}>Delete account</button>
      </label>
      {showConfirmation && (
        <div>
          <br/>
          <p>Are you sure you want to delete your account?</p>
          <br/>
          <label>
            <h3> Confirm by using your password: </h3>
            <br/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </label>
          <br/>
          <button className="settings-btn" onClick={handleDelete}>I'm sure, Delete</button>
          <button className="settings-btn" onClick={toggleConfirmation}>Cancel</button>
          <br/>
          <div className="p">{error}</div>
        </div>
      )}
      <br/>
    </div>
  );
};

export default UserProfile;