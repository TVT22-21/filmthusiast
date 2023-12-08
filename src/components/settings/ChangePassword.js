import React, { useState } from 'react';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = () => {
    console.log('Changing password...');
  };

  return (
    <div>
      <h3>Vaihda Salasana</h3>
      <label>
        <h3> Nykyinen Salasana: </h3>
        <input type="salasana" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
      </label>
      <br />
      <label>
        Uusi Salasana:
        <input type="salasana" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleChangePassword}>Vaihda Salasana:</button>
    </div>
  );
};

export default ChangePassword;