import { useState } from "react";
import axios from "axios";


function NewRating(){
  const [data, setData] = useState([]);
  const [idmovie, setIdmovie] = useState('');
  const [rating, setRating] = useState('');
  const [ratingtext, setRatingtext] = useState('');
  const [username, setUname] = useState('');
  const [virhe, setVirhe] = useState('');
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

    function GetRatingid(idmovie){
      const [data, setData] = useState([]);
      const [idmovie, setIdmovie] = useState('');
      axios.get(`http://localhost:3001/rating/getrating/idmovie?idmovie=${idmovie}`)
        .then(resp => {
            console.log('Response:', resp.data);
            setData(resp.data);
            return data;
        })
        .catch(error => console.log(error.message))

    };

    function GetRating(username){
      const [username, setUname] = useState('');
      const [data, setData] = useState([]);
        axios.get(`http://localhost:3001/rating/getrating?username=${username}`)
        .then(resp => {
            console.log('Response:', resp.data);
            setData(resp.data);
            return data;
        })
        .catch(error => console.log(error.message))

    };

    function GetRatingrating(rating){
      const [rating, setRating] = useState('');
      const [data, setData] = useState([]);
        axios.get(`http://localhost:3001/rating/getrating/rating?rating=${rating}`)
        .then(resp => {
            console.log('Response:', resp.data);
            setData(resp.data);
            return data;
        })
        .catch(error => console.log(error.message))

    };