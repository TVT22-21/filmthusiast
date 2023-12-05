import React, { useState } from 'react';
import { NewRating } from '../components/rated/rated';

const TestForm = () => {
    // State variables
    const [idmovie, setIdmovie] = useState('55');
    const [rating, setRating] = useState('2');
    const [ratingtext, setRatingtext] = useState('asdasdasd');
    const [username, setUsername] = useState('niilo');
  
    // Event handler for button click
    const handleRatingSubmit = async () => {
      console.log(idmovie, rating, ratingtext, username);
      const result = await NewRating(idmovie, rating, ratingtext, username);
      console.log('Result:', result);
    };

    // JSX rendering
    return (
        <div>
            <h2>Test Form Component</h2>
            <input type="text" value={idmovie} onChange={(e) => setIdmovie(e.target.value)} placeholder="idmovie" />
            <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="rating" />
            <input type="text" value={ratingtext} onChange={(e) => setRatingtext(e.target.value)} placeholder="ratingtext" />
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" /> 

            {/* Button to trigger the handleRatingSubmit function */}
            <button onClick={handleRatingSubmit}>Submit Rating</button>
        </div>
    );
}

export default TestForm;


