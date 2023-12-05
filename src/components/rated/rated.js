import { useState } from 'react';
import axios from 'axios';

const NewRating = (idmovie, rating, ratingtext, username) => {
  const [virhetext, setVirhetext] = useState('');

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
        virhetext = resp.data.message;
      } else {
        virhetext = 'Arvostelu onnistui!';
      }
      return virhetext;
    })
    .catch((error) => {
      if (error.response) {
        console.log('Rating error:', error.response.data);
        virhetext = error.response.data.error || 'Arvostelu epäonnistui';
      } else if (error.request) {
        console.log('Network error:', error.request);
        virhetext = 'Verkkovirhe, yritä uudelleen myöhemmin';
      } else {
        console.error('Error message:', error.message);
        virhetext = 'Arvostelu epäonnistui';
      }
      return virhetext;
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