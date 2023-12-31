const pgPool = require('./connection');

const database = {
    INSERT_PERSON: 'INSERT INTO person (username, password, email, createdate) VALUES ($1, $2, $3, $4)',
    DELETE_PERSON: 'DELETE FROM person WHERE username = $1',
    GET_PERSON: 'SELECT email, createdate FROM person where username = $1',
    UPDATE_PASSWORD: 'UPDATE person SET password = $1 WHERE username = $2',
    UPDATE_EMAIL: 'UPDATE person SET email = $1 WHERE username = $2',
    CHECK_USERNAME: 'SELECT * FROM person WHERE username = $1',
    CHECK_UNAME: 'SELECT * FROM person WHERE idperson = $1',
    CHECK_EMAIL: 'SELECT * FROM person WHERE email = $1',
    GET_PW: 'SELECT password FROM person WHERE username = $1'
};

async function addPerson(username, password, email, createdate){
    await pgPool.query(database.INSERT_PERSON, [username, password, email, createdate])
}


async function deletePerson(username){
    await pgPool.query(database.DELETE_PERSON, [username])
}

async function getPerson(username){
    const result = await pgPool.query(database.GET_PERSON, [username]);
    const rows = result.rows;
    return rows;
}


async function updatePassword(hashPw, username){
    await pgPool.query(database.UPDATE_PASSWORD, [hashPw, username])
}

async function updateEmail(email, username){
    await pgPool.query(database.UPDATE_EMAIL, [email, username])
}

async function checkUsername(username){
    const result = await pgPool.query(database.CHECK_USERNAME, [username]);
    return result.rows.length > 0;
}

async function checkUname(idperson){
    const result = await pgPool.query(database.CHECK_UNAME, [idperson]);
    return result.rows.length > 0;
}

async function checkEmail(email){
    const result = await pgPool.query(database.CHECK_EMAIL, [email]);
    return result.rows.length > 0;
}

async function checkPerson(username){
    const result = await pgPool.query(database.GET_PW, [username]);

    if(result.rows.length > 0){
        return result.rows[0].password;
    }else{
        return null;
    }

}

module.exports = {addPerson, deletePerson, getPerson, updatePassword, updateEmail, checkUsername, checkEmail, checkPerson, checkUname};
