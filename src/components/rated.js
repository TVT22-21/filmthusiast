import { useState } from "react";
import axios from "axios";

function newRating(){
    const [idmovie, setIdmovie] = useState('');
    const [rating, setRating] = useState('');
    const [ratingtext, setRatingtext] = useState('');
    const [username, setUname] = useState('');
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
    }

    function getRatingid(){
        const[idmovie, setIdmovie] = useState('');
        axios.get('http://localhost:3001/rating/getrating/idmovie', {idmovie})
        .then(resp => {
            console.log('Response:', resp.data);
        })
        .catch(error => console.log(error.message))

    }

    function getRating(){
        const[username, setUname] = useState('');
        axios.get('http://localhost:3001/rating/getrating', {username})
        .then(resp => {
            console.log('Response:', resp.data);
        })
        .catch(error => console.log(error.message))

    }

    function getRatingrating(){
        const[rating, setRating] = useState('');
        axios.get('http://localhost:3001/rating/getrating/rating', {rating})
        .then(resp => {
            console.log('Response:', resp.data);
        })
        .catch(error => console.log(error.message))

    }