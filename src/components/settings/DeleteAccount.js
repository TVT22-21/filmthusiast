import React, { useState } from 'react';
import axios from 'axios';

const UserProfile = ({ username }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

const handleDeleteProfile = async () => {
    try {
      const response = await axios.delete("http://localhost:3001/deletePerson")
      console.log(response.data.message);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

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
          <button onClick={handleDeleteProfile}>Kyllä, Poista</button>
          <button onClick={toggleConfirmation}>Peruuta</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;