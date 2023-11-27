require('dotenv').config();

const { Pool } = require('pg');

const pgPool = new Pool({
host: process.env.pghost,
port: process.env.pgport,
database: process.env.pgdatabase,
user: process.env.pguser,
password: process.env.pgpassword,
ssl: true
});

pgPool.connect((err)=>{
    if(err){
        console.log(err.message);
    }
});

pgPool.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Error connecting to the database', err));


module.exports = pgPool;