const pgPool = require('./connection');

const database = {
    INSERT_PERSON: 'INSERT INTO person (username, password, email, createdate) VALUES ($1, $2, $3, $4)'
};

addPerson('mai', 'matti34', 'mattei3@mattila.fi', new Date());

async function addPerson(username, password, email, createdate){
    await pgPool.query(database.INSERT_PERSON, [username, password, email, createdate])
}