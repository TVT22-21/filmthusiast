const { use } = require('../routes/rating');
const pgPool = require('./connection');

const database = {
    INSERT_PROFILE: 'INSERT INTO profile (profiletitle, firstname, lastname, description, person_idperson) VALUES ($1, $2, $3, $4, $5)',
    DELETE_PROFILE: 'DELETE FROM profile WHERE person_idperson = $1',
    UPDATE_PROFILE_TITLE: 'UPDATE profile SET profiletitle = $1 WHERE person_idperson = $2',
    UPDATE_PROFILE_FNAME: 'UPDATE profile SET firstname = $1 WHERE person_idperson = $2',
    UPDATE_PROFILE_LNAME: 'UPDATE profile SET lastname = $1 WHERE person_idperson = $2',
    UPDATE_PROFILE_DESC: 'UPDATE profile SET description = $1 WHERE person_idperson = $2',
    ADD_TO_PROFILE_WATCHLIST: 'UPDATE profile SET watchlist = array_append(watchlist, $1) FROM person WHERE profile.person_idperson = person.idperson AND person.username = $2',
    DELETE_FROM_PROFILE_WATCHLIST: 'UPDATE profile SET watchlist = array_remove(watchlist, $1) FROM person WHERE profile.person_idperson = person.idperson AND person.username = $2',
    GET_PROFILE: 'SELECT pr.* FROM profile pr JOIN person p ON pr.person_idperson = p.idperson WHERE p.username = $1',
    GET_WATCHLIST: 'SELECT pr.watchlist FROM profile pr JOIN person p ON pr.person_idperson = p.idperson WHERE p.username = $1'
}


async function createProfile(profiletitle, firstname, lastname, description, person_idperson){
    await pgPool.query(database.INSERT_PROFILE, [profiletitle, firstname, lastname, description, person_idperson])
}

async function deleteProfile(person_idperson){
    await pgPool.query(database.DELETE_PROFILE, [person_idperson])
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

async function addToWatchlist(movie_id, username){
    await pgPool.query(database.ADD_TO_PROFILE_WATCHLIST, [movie_id, username])
}

async function deleteFromWatchlist(movie_id, username){
    await pgPool.query(database.DELETE_FROM_PROFILE_WATCHLIST, [movie_id, username])
    console.log(movie_id + username);
}

async function getWatchlist(username){
    const result = await pgPool.query(database.GET_WATCHLIST, [username]);
    return result.rows;
}

async function getProfile(username){
    const result = await pgPool.query(database.GET_PROFILE, [username]);
    return result.rows;
}


module.exports = {updateProfiletitle, updateFirstname, updateLastname, 
updateDescription, addToWatchlist, deleteFromWatchlist, getWatchlist, getProfile, deleteProfile, createProfile};