const pgPool = require('./connection');

const database = {
    INSERT_PERSON: 'INSERT INTO Person (username, password, email, createdate) VALUES ($1, $2, $3, $4)',
    GET_PERSON: 'SELECT username,password,email,createdate FROM Person',
    GET_PW: 'SELECT password FROM Person WHERE username=$1'
};

async function addPerson(username, password, email, createdate){
    await pgPool.query(database.INSERT_PERSON, [username, password, email, createdate])
}

async function getPerson(){
    const result = await psPool.query(database.GET_PERSON);
    const rows = result.rows;
    return rows;
}

async function checkPerson(username){
    const result = await pgPool.query(database.GET_PW, [username]);

    if(result.rows.length > 0){
        return result.rows[0].password;
    }else{
        return null;
    }

}

module.exports = {addPerson, getPerson, checkPerson};