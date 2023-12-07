import React, { useState } from 'react';
import RegisterForm from './components/register/register';
import './App.css';
import styles from './styles';
import CategoryButton from './components/Category/CategoryButton';
import SearchPage from './components/search/searchPage';
import Profile from './components/profile/profile';


function homepage() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false); // State to control the profile window

  const openLoginModal = () => {
    document.getElementById("loginModal").style.display = "block";
  };

  const closeLoginModal = () => {
    document.getElementById("loginModal").style.display = "none";
  };

  const openRegisterModal = () => {
    setShowRegisterForm(true);
  };

  const closeRegisterModal = () => {
    setShowRegisterForm(false);
  };

  const handleModalClick = (event) => {
    if (event.target.id === "loginModal") {
      closeLoginModal();
    }
  };

  const handleOpenProfile = () => {
    setShowProfile(true);
  };

  const categories = ["Category 1", "Category 2", "Category 3"];
  

  return (
    <div>
      <div className="animation-container"></div>
      <div style={styles.appContainer}>
        
        <div style={styles.body} className="App">
        
        <div style={styles.middleBar}></div>
        <form1>
        <CategoryButton categories={categories} style={styles.formElement} />
        </form1>
          <header style={styles.header}>
            <h1 style={styles.h1}>Filmthusiast</h1>
            <SearchPage style={styles.formElement} />
            <form style={styles.form} action="#" method="get">
              
            <button onClick={handleOpenProfile}>Open Profile</button>
      {showProfile && <Profile />} {/* Render the Profile component when showProfile is true */}
              

              <button onClick={openLoginModal} className="button">
              Sign in
              </button>
              <button onClick={openRegisterModal} className="registration-button">
              Register
              </button>          
            </form>
          </header>
        </div>
      </div>

      <div id="loginModal" className="modal" onClick={handleModalClick}>
        <div style={styles.modalContent}>
          <span style={styles.close} onClick={closeLoginModal}>
            &times;
          </span>
          <h2>Login</h2>
          <form action="#" method="post">
            <label htmlFor="username">Username:</label>
            <input style={styles.inputText} type="text" id="username" name="username" required />
            <br />
            <label htmlFor="password">Password:</label>
            <input style={styles.inputText} type="password" id="password" name="password" required />
            <input style={styles.inputSubmit} type="submit" value="Login" />
          </form>
        </div>

      </div>
      {showRegisterForm && <RegisterForm onClose={closeRegisterModal} />}
    </div>
  );
}

export default homepage;