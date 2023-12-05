require('dotenv').config();

const express = require('express');

const ratingRoute = require('./routes/rating');
const profileRoute = require('./routes/profileRoute');
const personRoute = require('./routes/personRoute');
const login = require('./routes/login');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));


app.use('/profile', profileRoute);
app.use('/rating', ratingRoute);
app.use('/person', personRoute);
app.use('/login', login);


const PORT = process.env.PORT  ;



app.listen(PORT, function () {
  console.log("Server running on port " + PORT);
});