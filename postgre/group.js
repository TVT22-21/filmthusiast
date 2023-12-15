const pgPool = require('./connection');

const database = {
    INSERT_GROUP: 'INSERT INTO grouptable (groupname, grouptitle, groupdescription, groupcreatedate) VALUES ($1, $2, $3, NOW())',
    UPDATE_GROUP: 'UPDATE grouptable SET groupname = $1, grouptitle = $2, groupdescription = $3 WHERE idgroup = $4',
    ADD_PERSON_TO_GROUP: 'INSERT INTO persongroup (group_idgroup, person_idperson) SELECT $1 AS group_idgroup, idperson FROM person WHERE username = $2',
    GET_GROUP: 'SELECT * FROM grouptable WHERE groupname = $1',
    GET_GROUP_BY_ID: 'SELECT * FROM persongroup WHERE person_idperson = $1'
};

async function addGroup(groupname, grouptitle, groupdescription) {
    await pgPool.query(database.INSERT_GROUP, [groupname, grouptitle, groupdescription]);
}

async function updateGroup(groupname, grouptitle, groupdescription) {
    await pgPool.query(database.UPDATE_GROUP, [groupname, grouptitle, groupdescription]);
}

async function addPersonToGroup(group_idgroup, username) {
    await pgPool.query(database.ADD_PERSON_TO_GROUP, [group_idgroup, username]);
    console.log(group_idgroup + username + "randomii");
}

async function getGroup(groupname) {
    const { rows } = await pgPool.query(database.GET_GROUP, [groupname]);
    return rows;
}

async function getGroupById(person_idperson) {
    const rows = await pgPool.query(database.GET_GROUP_BY_ID, [person_idperson]);
    console.log(rows.rows[0]);
    return rows.rows[0];
}

module.exports = { addGroup, updateGroup, addPersonToGroup, getGroup, getGroupById };