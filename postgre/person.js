const pgPool = require('./connection');

const database = {
    INSERT_PERSON: 'INSERT INTO person (username, password, email, createdate) VALUES ($1, $2, $3, $4)',
    DELETE_PERSON: 'DELETE FROM person WHERE username = $1 AND password = $2',
    GET_PERSON: 'SELECT email, createdate FROM person where username = $1',
    UPDATE_PASSWORD: 'UPDATE person SET password = $1 WHERE username = $2',
    UPDATE_EMAIL: 'UPDATE person SET email = $1 WHERE username = $2',
    CHECK_USERNAME: 'SELECT * FROM person WHERE username = $1',
    CHECK_EMAIL: 'SELECT * FROM person WHERE email = $1'
};

async function addPerson(username, password, email, createdate){
    await pgPool.query(database.INSERT_PERSON, [username, password, email, createdate])
}

async function deletePerson(username, password){
    await pgPool.query(database.DELETE_PERSON, [username, password])
}

async function getPerson(username){
    const result = await pgPool.query(database.GET_PERSON, [username]);
    const rows = result.rows;
    return rows;
}

async function updatePassword(password, username){
    await pgPool.query(database.UPDATE_PASSWORD, [password, username])
}

async function updateEmail(email, username){
    await pgPool.query(database.UPDATE_EMAIL, [email, username])
}

async function checkUsername(username){
    const result = await pgPool.query(database.CHECK_USERNAME, [username]);
    return result.rows.length > 0;
}

async function checkEmail(email){
    const result = await pgPool.query(database.CHECK_EMAIL, [email]);
    return result.rows.length > 0;
}

module.exports = {addPerson, deletePerson, getPerson, updatePassword, updateEmail, checkUsername, checkEmail};