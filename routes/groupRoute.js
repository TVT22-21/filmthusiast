const express = require('express');
const router = express.Router();
const { addGroup, updateGroup, addPersonToGroup, getGroup, showGroupMembers, getMembers } = require('../postgre/group');
const pgPool = require('../postgre/connection');
const groupController = require('../postgre/group');


router.get('/getgroups', async (req, res) => {
  try {
    const query = `
      SELECT idgroup, groupname, grouptitle, groupdescription, groupcreatedate
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

    const groupIdQuery = `
      SELECT idgroup FROM grouptable WHERE groupname = $1;
    `;

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

router.get('/members', async (req, res) => {

  try {
    const {group_idgroup} = req.query;
    const groupData = await getMembers(group_idgroup);
    console.log(groupData);
    res.status(200).json(groupData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getmembers', async (req, res) => {
  try {

    const {group_idgroup} = req.query;
    if (!req.query) {
        console.error(error);
    }
   
    const memberdata = await showGroupMembers(group_idgroup);
    console.log(memberdata);
    res.status(200).json(memberdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
});

/*
router.get('/getusernames/:idperson', async (req, res) => {
  try {
      const { idperson } = req.params;

      if (!idperson) {
          return res.status(400).json({ error: 'Missing idperson parameter' });
      }

      const result = await showGroupMembers(idperson);

      // Check if there are rows in the result
      if (result.rows && result.rows.length > 0) {
          // Extract usernames from the result and send them in the response
          const usernames = result.rows.map(row => row.username);
          return res.status(200).json({ usernames });
      } else {
          return res.status(404).json({ error: 'No usernames found for the given idperson' });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});*/
/*
router.get('/getusername/:person_idperson', async (req, res) => {
  const { person_idperson } = req.params;

  try {
    const query = `
      SELECT username
      FROM person
      WHERE idperson = $1;
    `;

    const { rows } = await pgPool.query(query, [person_idperson]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const username = rows[0].username;
    res.status(200).json({ username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});*/

module.exports = router; 