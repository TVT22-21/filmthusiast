import { useState } from 'react';
import axios from 'axios';

const NewRating = (idmovie, rating, ratingtext, username) => {
  let virhe = '';

  const data = new URLSearchParams();
  data.append('idmovie', idmovie);
  data.append('rating', rating);
  data.append('ratingtext', ratingtext);
  data.append('username', username);

  return axios
    .post('http://localhost:3001/rating/addrating', data)
    .then((resp) => {
      console.log('Rating response:', resp.data);
      if (resp.data.message) {
        virhe = resp.data.message;
      } else {
        virhe = 'Arvostelu onnistui!';
      }
      return virhe;
    })
    .catch((error) => {
      if (error.response) {
        console.log('Rating error:', error.response.data);
        virhe = error.response.data.error || 'Arvostelu epäonnistui';
      } else if (error.request) {
        console.log('Network error:', error.request);
        virhe = 'Verkkovirhe, yritä uudelleen myöhemmin';
      } else {
        console.error('Error message:', error.message);
        virhe = 'Arvostelu epäonnistui';
      }
      return virhe;
    });
};


    function GetRatingid(idmovie){
      const [data, setData] = useState([]);
      const [idmovieparam, setIdmovieparam] = useState('');
      axios.get(`http://localhost:3001/rating/getrating/idmovie?idmovie=${idmovie}`)
        .then(resp => {
            console.log('Response:', resp.data);
            setData(resp.data);
            return data;
        })
        .catch(error => console.log(error.message))

    };

    function GetRating(username){
      const [usernameparam, setUnameparam] = useState('');
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
      const [ratingparam, setRatingparam] = useState('');
      const [data, setData] = useState([]);
        axios.get(`http://localhost:3001/rating/getrating/rating?rating=${rating}`)
        .then(resp => {
            console.log('Response:', resp.data);
            setData(resp.data);
            return data;
        })
        .catch(error => console.log(error.message))

    };


    export {NewRating};