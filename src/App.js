import React from 'react';
import styles from './styles';
import CategoryButton from './components/CategoryButton'; 



function App() {
    const openLoginModal = () => {
        document.getElementById('loginModal').style.display = 'block';
      };
    
      const closeLoginModal = () => {
        document.getElementById('loginModal').style.display = 'none';
      };
    
      const handleModalClick = (event) => {
        if (event.target.id === 'loginModal') {
          closeLoginModal();
        }
      };
      
        const categories = ['Category 1', 'Category 2', 'Category 3'];
    
        return (
          <div>
            <div className="animation-container"></div>
      
            <div style={styles.appContainer}>
              {/* Your buttons, text, and other content */}
              <CategoryButton categories={categories} />
              <div style={styles.body} className="App">
                <header style={styles.header}>
                  <h1 style={styles.h1}>Filmthusiast</h1>
                  <form action="#" method="get">
                    <input style={styles.inputText} type="text" name="search" placeholder="Search..." />
                    <input style={styles.inputSubmit} type="submit" value="Search" />
                    <button onClick={openLoginModal} style={styles.button}>Sign in</button>
                    <button style={{ ...styles.button, ...styles.registrationButton }} className="registration-button">Sign up</button>
                    <button style={{ ...styles.button, ...styles.settingsButton }} className="settings-button">Settings</button>
                  
                  </form>
             
                </header>
                </div>
      </div>
    
          <div
            id="loginModal"
            className="modal"
            onClick={handleModalClick}
          >
            <div style={styles.modalContent}>
              <span style={styles.close} onClick={closeLoginModal}>&times;</span>
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
        </div>
        
        
  );
  
};
   
    
    
    export default App;