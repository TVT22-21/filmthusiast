require('dotenv').config();

const express = require('express');

const ratingRoute = require('./routes/rating');
const profileRoute = require('./routes/profileRoute');
const personRoute = require('./routes/personRoute');
const loginRoute = require('./routes/login');
const groupRoute = require('./routes/groupRoute');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));


app.use('/login', loginRoute);
app.use('/profile', profileRoute);
app.use('/rating', ratingRoute);
app.use('/person', personRoute);
app.use('/groups', groupRoute);

//app.post('/groups/create', (req, res) => {
//  console.log('Received request to create a group');

//});
//app.post('/groups/join', (req, res) => {

//});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});