const { addGroup, addPersonToGroup } = require('./group');

async function getAllGroups(req, res) {

}

async function createGroup(req, res) {
  const { groupname, grouptitle, groupdescription } = req.body;

  try {
 
    await addGroup(groupname, grouptitle, groupdescription);
    res.status(201).send('Group created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function joinGroup(req, res) {
  const { groupId, idprofiili } = req.body;

  try {

    await addPersonToGroup(groupId, idprofiili);
    res.status(200).send('Joined group successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { getAllGroups, createGroup, joinGroup };