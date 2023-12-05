const pgPool = require('./connection');

const database = {
    INSERT_GROUP: 'INSERT INTO `filmthusiastdb`.`Group` (groupname, grouptitle, groupdescription, groupcreatedate) VALUES ($1, $2, $3, NOW())',
    UPDATE_GROUP: 'UPDATE `filmthusiastdb`.`Group` SET groupname = $1, grouptitle = $2, groupdescription = $3 WHERE idGroup = $4',
    ADD_PERSON_TO_GROUP: 'INSERT INTO `filmthusiastdb`.`User_Group` (Group_idGroup, AppUser_idAppUser) VALUES ($1, $2)'
}

async function addGroup(groupname, grouptitle, groupdescription) {
    await pgPool.query(database.INSERT_GROUP, [groupname, grouptitle, groupdescription]);
}

async function updateGroup(groupId, groupname, grouptitle, groupdescription) {
    await pgPool.query(database.UPDATE_GROUP, [groupname, grouptitle, groupdescription, groupId]);
}

async function addPersonToGroup(groupId, person_idperson) {
    await pgPool.query(database.ADD_PERSON_TO_GROUP, [groupId, person_idperson]);
}


module.exports = { addGroup, updateGroup, addPersonToGroup };