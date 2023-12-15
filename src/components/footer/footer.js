

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userInfo } from '../register/signals';
import { SearchBar } from '../search/searchPage';
import './footer.css';

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function Footer() {


    return (
      
      <div class="footer-container">
        <div className="footer-left">
            <button className="footer-btn" onClick={scrollToTop}>Scroll to top</button>
        </div>
      </div>
    );
  }
  

export { Footer };