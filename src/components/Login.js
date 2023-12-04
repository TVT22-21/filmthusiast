import React, { useState } from 'react';
import styles from './styles';  // Adjust the import path accordingly

const Login = ({ openLoginModal, closeLoginModal, handleModalClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Add your login logic here
    // You can use 'username' and 'password' state values
    // For example, you might want to make an API call to authenticate the user

    // After successful login, you can close the modal
    closeLoginModal();
  };

  return (
    <div>
      <button onClick={openLoginModal} style={styles.button}>
        Sign in
      </button>

      {/* Your login modal code goes here */}
      <div id="loginModal" className="modal" onClick={handleModalClick}>
        <div style={styles.modalContent}>
          <span style={styles.close} onClick={closeLoginModal}>
            &times;
          </span>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              style={styles.inputText}
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              style={styles.inputText}
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <input style={styles.inputSubmit} type="submit" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;