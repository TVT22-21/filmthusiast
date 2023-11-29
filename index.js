
const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes/profileRoute');
const app = express();

dotenv.config();
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT  ;

app.use('/', routes); 

app.listen(PORT, function () {
  console.log("Server running on port " + PORT);
});