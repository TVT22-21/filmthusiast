const express = require('express');
const router = express.Router();
const { addGroup, updateGroup, addPersonToGroup } = require('../postgre/group');
const pgPool = require('../postgre/connection');
const groupController = require('../postgre/group');


router.get('/getgroups', async (req, res) => {
  try {
    const query = `
      SELECT groupname, grouptitle, groupdescription, groupcreatedate
      FROM grouptable;
    `;
    const { rows, fields } = await pgPool.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getAllGroups', async (req, res) => {
  console.log('get all groups dasdasdadad');
  try {
    
    const response = await getAllGroups();
    console.log(response);
    const { rows, fields } = await pgPool.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/create', async (req, res) => {
  const { groupname, grouptitle, groupdescription } = req.body;
  try {
    await addGroup(groupname, grouptitle, groupdescription);
    res.status(201).json({ message: 'Group created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/join', async (req, res) => { 
  const { group_idgroup, username } = req.body;
  console.log(group_idgroup + username);
  try {
    await addPersonToGroup(group_idgroup, username);
    res.status(200).json({ message: 'Joined group successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;