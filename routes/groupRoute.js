const express = require('express');
const router = express.Router();
const { addGroup, updateGroup, addPersonToGroup, getGroupById } = require('../postgre/group');
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

router.get('/getGroupById', async (req, res) => {
  try {
    const { person_idperson } = req.query; 
    console.log(person_idperson);
    
    const response = await getGroupById(person_idperson);
    console.log(response);
    
    res.status(200).json(response); 
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
  const { groupname, username } = req.body;

  try {
    const groupIdQuery = 
      'SELECT idgroup FROM grouptable WHERE groupname = $1';
    ;
    const { rows } = await pgPool.query(groupIdQuery, [groupname]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Group not found' });
      return;
    }

    const group_idgroup = rows[0].idgroup;

    await addPersonToGroup(group_idgroup, username);
    res.status(200).json({ message: 'Joined group successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;