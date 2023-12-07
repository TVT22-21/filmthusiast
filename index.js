require('dotenv').config();

const express = require('express');

const ratingRoute = require('./routes/rating');
const profileRoute = require('./routes/profileRoute');
const personRoute = require('./routes/personRoute');
const login = require('./routes/login');
const groupRoute = require('./routes/groupRoute');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));



app.use('/profile', profileRoute);
app.use('/rating', ratingRoute);
app.use('/person', personRoute);
app.use('/groups', groupRoute);

app.post('/groups/create', (req, res) => {
  console.log('Received request to create a group');
  // ... rest of the code
});
app.post('/groups/join', (req, res) => {
  console.log('Received request to join a group');
  // ... rest of the code
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});