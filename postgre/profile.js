const pgPool = require('./connection');

const database = {
    INSERT_PROFILE: 'INSERT INTO profile (profiletitle, firstname, lastname, description, person_idperson) VALUES ($1, $2, $3, $4, $5)',
    UPDATE_PROFILE_TITLE: 'UPDATE profile SET profiletitle = $1 WHERE person_idperson = $2',
    UPDATE_PROFILE_FNAME: 'UPDATE profile SET firstname = $1 WHERE person_idperson = $2',
    UPDATE_PROFILE_LNAME: 'UPDATE profile SET lastname = $1 WHERE person_idperson = $2',
    UPDATE_PROFILE_DESC: 'UPDATE profile SET description = $1 WHERE person_idperson = $2',
    GET_PROFILE: 'SELECT * FROM profile'
}
/*
addProfile('Jakkken profiili', 'Jakke','Jiii', 'Hei tämfefef', 6);
updateProfiletitle('Tämä on päivitetty otsikko', 8);
updateFirstname('Teppo', 8);
updateLastname('Virtanen', 8);
updateDescription('joo näihä seon tosijjaa', 8);
getProfile();*/

async function addProfile(profiletitle, firstname, lastname, description, person_idperson){
    await pgPool.query(database.INSERT_PROFILE, [profiletitle, firstname, lastname, description, person_idperson])
}

async function updateProfiletitle(profiletitle, person_idperson){
    await pgPool.query(database.UPDATE_PROFILE_TITLE, [profiletitle, person_idperson])
}

async function updateFirstname(firstname, person_idperson){
    await pgPool.query(database.UPDATE_PROFILE_FNAME, [firstname, person_idperson])
}

async function updateLastname(lastname, person_idperson){
    await pgPool.query(database.UPDATE_PROFILE_LNAME, [lastname, person_idperson])
}

async function updateDescription(description, person_idperson){
    await pgPool.query(database.UPDATE_PROFILE_DESC, [description, person_idperson])
}

async function getProfile(){
    const result = await pgPool.query(database.GET_PROFILE);
    const rows = result.rows;
    return rows;
}

module.exports = {addProfile, updateProfiletitle, updateFirstname, updateLastname, updateDescription, getProfile};