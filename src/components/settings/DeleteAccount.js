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
    setError("");
    //deleteSuccess();
  })
    .catch((error) => {
      console.log(error.response.data);
      console.log('Account delete failed');
      setError("Käyttäjän poistaminen epäonnistui.");
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
      <h3>Käyttäjän poistaminen: {username}</h3>
      
      <button onClick={toggleConfirmation}>Poista Käyttäjä</button>

      {showConfirmation && (
        <div>
          <p>Haluatko varmasti poistaa käyttäjäsi?</p>
          <label>
            <h3> Vahvista salasanalla: </h3>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Salasana" />
          </label>
          <button onClick={handleDelete}>Kyllä, Poista</button>
          <button onClick={toggleConfirmation}>Peruuta</button>
          <br/>
          <div className="text">{error}</div>
        </div>
      )}
      <br/>
    </div>
  );
};

export default UserProfile;