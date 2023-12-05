import { useState } from "react";
import axios from "axios";


export default function Rating() {
  const [data, setData] = useState([]);
  const [idmovie, setIdmovie] = useState('');
  const [rating, setRating] = useState('');
  const [ratingtext, setRatingtext] = useState('');
  const [username, setUname] = useState('');
  const [virhe, setVirhe] = useState('');
function NewRating(){
    axios.post('http://localhost:3001/rating/addrating', { idmovie, rating, ratingtext, username })
    .then(resp => {
        console.log('Rating response:', resp.data);
        if (resp.data.message) {
          setVirhe(resp.data.message);
        } else {
          setVirhe('Arvostelu onnistui!');
        }
      })
      .catch(error => {
        if (error.response) {
          console.log('Rating error:', error.response.data);
          setVirhe(error.response.data.error || 'Arvostelu epäonnistui');
        } else if (error.request) {
          console.log('Network error:', error.request);
          setVirhe('Verkkovirhe, yritä uudelleen myöhemmin');
        } else {
          console.error('Error message:', error.message);
          setVirhe('Arvostelu epäonnistui');
        }
      });
    };

    function GetRatingid(){
      axios.get(`http://localhost:3001/rating/getrating/idmovie?idmovie=${idmovie}`)
        .then(resp => {
            console.log('Response:', resp.data);
            setData(resp.data);
        })
        .catch(error => console.log(error.message))

    };

    function GetRating(){
        axios.get(`http://localhost:3001/rating/getrating?username=${username}`)
        .then(resp => {
            console.log('Response:', resp.data);
            setData(resp.data);
        })
        .catch(error => console.log(error.message))

    };

    function GetRatingrating(){
        axios.get(`http://localhost:3001/rating/getrating/rating?rating=${rating}`)
        .then(resp => {
            console.log('Response:', resp.data);
            setData(resp.data);
        })
        .catch(error => console.log(error.message))

    };

    return (
      <div>
        <label>
          Movie ID:
          <input
            type="text"
            value={idmovie}
            onChange={(e) => setIdmovie(e.target.value)}
          />
        </label>
        <button type="button" onClick={GetRatingid}>
          Test getRatingid
        </button>

        <label>
          RATING:
          <input
            type="text"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </label>
        <button type="button" onClick={GetRatingrating}>
          Test Ratingvalue
        </button>

        <label>
          USERNAME:
          <input
            type="text"
            value={username}
            onChange={(e) => setUname(e.target.value)}
          />
        </label>
        <button type="button" onClick={GetRating}>
          Test Ratingvalue
        </button>
        {data.length > 0 && (
          <div>
            <p>Response:</p>
            <ul>
              {data.map((item, index) => (
                <li key={index}>
                  <strong>Rating:</strong> {item.rating}, 
                  <strong> Text:</strong> {item.ratingtext}, 
                  <strong> Date:</strong> {item.ratingdate}, 
                  <strong> Username:</strong> {item.username}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

 