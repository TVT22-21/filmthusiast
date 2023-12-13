import React, { useState } from 'react';
import axios from 'axios';
import { userInfo } from '../register/signals';
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
    //deleteSuccess();
  })
    .catch((error) => {
      console.log(error.response.data);
      console.log('Account delete failed');
      setError("Account delete failed. Password incorrect.");
    });
}
/*
    function deleteSuccess() {
      jwtToken.value = null;
      console.log('Account deleted succesfully. Logged out');
      }
      */

    const toggleConfirmation = () => {
      setShowConfirmation(!showConfirmation);
    };

  return (
    <div>
      <h3>Delete your account: {username}</h3>
      
      <button onClick={toggleConfirmation}>Delete account</button>

      {showConfirmation && (
        <div>
          <p>Are you sure you want to delete your account?</p>
          <label>
            <h3> Confirm by using your password: </h3>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </label>
          <button onClick={handleDelete}>I'm sure, Delete</button>
          <button onClick={toggleConfirmation}>Cancel</button>
          <br/>
          <div className="text">{error}</div>
        </div>
      )}
      <br/>
    </div>
  );
};

export default UserProfile;