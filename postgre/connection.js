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

async function runQuery() {
    try {
      const result = await client.query('SELECT * FROM person');
      console.log('Query result:', result.rows);
    } catch (err) {
      console.error('Error running query', err);
    } finally {
      await client.end();
    }
  }

runQuery();

module.exports = pgPool;