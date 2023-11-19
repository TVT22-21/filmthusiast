const pgPool = require('./connection');

const database = {
    INSERT_PERSON: 'INSERT INTO person (username, password, email, createdate) VALUES ($1, $2, $3, $4)',
    DELETE_PERSON: 'DELETE FROM person WHERE username = $1 AND password = $2',
    GET_PERSON: 'SELECT username, email FROM person WHERE idPerson = $1',
    UPDATE_PASSWORD: 'UPDATE person SET password = $1 WHERE username = $2',
    UPDATE_EMAIL: 'UPDATE person SET email = $1 WHERE username = $2'
};

//addPerson('mmi', 'matti324', 'mattei34@mattila.fi', new Date());
//deletePerson(12);
//getPerson(9);
//newPassword('matti3456', 9);
//newEmail('mattila@matti.fi', 9);

async function addPerson(username, password, email, createdate){
    await pgPool.query(database.INSERT_PERSON, [username, password, email, createdate])
}

async function deletePerson(username, password){
    await pgPool.query(database.DELETE_PERSON, [username, password])
}

async function getPerson(idPerson){
    await pgPool.query(database.GET_PERSON, [idPerson])
}

async function updatePassword(password, username){
    await pgPool.query(database.UPDATE_PASSWORD, [password, username])
}

async function updateEmail(email, username){
    await pgPool.query(database.UPDATE_EMAIL, [email, username])
}

module.exports = {addPerson, deletePerson, getPerson, updatePassword, updateEmail};