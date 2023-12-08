import React, { useState } from 'react';

const ChangeEmail = () => {
  const [newEmail, setNewEmail] = useState('');

  const handleChangeEmail = () => {
    
    console.log('Päivitetään sähköpostia...');
  };

  return (
    <div>
      <h3>Vaihda Sähköposti</h3>
      <label>
        Uusi Sähköposti:
        <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
      </label>
      <br />
      <button onClick={handleChangeEmail}>Päivitä Sähköposti</button>
    </div>
  );
};

export default ChangeEmail;