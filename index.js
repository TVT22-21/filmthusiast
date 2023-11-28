require('dotenv').config();

const express = require('express');

const profileRoute = require('./routes/profileRoute');
const personRoute = require('./routes/personRoute');
//const login = require('./routes/login');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const PORT = process.env.PORT;

app.use('/profile', profileRoute);
app.use('/person', personRoute);
//app.use('/login', login);



app.listen(PORT, function () {
  console.log("Server running on port " + PORT);
});