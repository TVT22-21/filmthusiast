
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GetRating } from '../rated/rated';


function Testi(){

  const [ratings, setRatings] = useState('');

  useEffect(() => {
    
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:3001/rating/getrating?username=Seppo`);
        setRatings(response.data);
        console.log(response);

      } catch (error) {
        setRatings('loading');
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
        <h2>Movie Ratings</h2>
        <div className="ratings-container">
            <p>These are ratings:</p>   
            {Array.isArray(ratings) ? (
            ratings.map((rating) => (
                <div key={rating.idrated}>
                <p><strong>Rating: </strong>{rating.rating}</p>
                <p><strong>Text: </strong>{rating.ratingtext}</p>
                <p><strong>Date: </strong>{new Date(rating.ratingdate).toLocaleString()}</p>
                <p><strong>Username: </strong>{rating.username}</p>
                </div>
            ))
            ) : (
            <p>Loading...</p>
            )}
        </div> 
    </div>
  );
}


export default Testi;
