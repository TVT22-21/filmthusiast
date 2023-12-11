import React, { useState } from 'react';
import axios from 'axios';
import {userInfo} from '../register/signals';


const UserProfile = ({ username= [userInfo.value?.private] }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [password, setPassword] = useState('');

function handleDelete(){
  axios.post("http://localhost:3001/person/delete", { username, password })
    .then((resp)=>{
    console.log(resp.data);
    console.log('Account deleted succesfully');
  })
    .catch((error) => {
      console.log(error.response.data);
      console.log('Account delete failed');
    });

  
}



    const toggleConfirmation = () => {
      setShowConfirmation(!showConfirmation);
    };

  return (
    <div>
      <h2>Käyttäjä: {username}</h2>
      
      <button onClick={toggleConfirmation}>Poista Käyttäjä</button>

      {showConfirmation && (
        <div>
          <p>Haluatko varmasti poistaa käyttäjäsi?</p>
          <label>
          <h3> Nykyinen Salasana: </h3>
          <input type="salasana" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button onClick={handleDelete}>Kyllä, Poista</button>
          <button onClick={toggleConfirmation}>Peruuta</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;