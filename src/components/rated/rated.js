import { useState } from 'react';
import axios from 'axios';

const NewRating = async (idmovie, rating, ratingtext, username) => {
  try {
    const response = await axios.post('http://localhost:3001/rating/addrating', {
      idmovie,
      rating,
      ratingtext,
      username,
    });

    console.log('Rating response:', response.data);

    if (response.data.message) {
      return Promise.reject(response.data.message);
    } else {
      return Promise.resolve('Arvostelu onnistui!');
    }
  } catch (error) {
    if (error.response) {
      console.log('Rating error:', error.response.data);
      return Promise.reject(error.response.data.error || 'Arvostelu epäonnistui');
    } else if (error.request) {
      console.log('Network error:', error.request);
      return Promise.reject('Verkkovirhe, yritä uudelleen myöhemmin');
    } else {
      console.error('Error message:', error.message);
      return Promise.reject('Arvostelu epäonnistui');
    }
  }
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