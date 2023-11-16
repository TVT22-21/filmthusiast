const express = require('express');
const {addProfile, updateProfiletitle, updateFirstname, updateLastname, updateDescription, getProfile} = require('../postgre/profile');
const router = express.Router();

router.get('/getProfile', async (req, res) => {
  try {
    res.json(await getProfile());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/updateFirstname', async (req, res) => {
  try {
    if (!req.body || !req.body.firstname || !req.body.person_idperson) {
      return res.status(400).json({ error: 'Bad Request: Missing required fields.' });
    }
    const { firstname, person_idperson } = req.body;
    await updateFirstname(firstname, person_idperson);
    res.json({ message: 'Firstname updated successfully.' });
  } catch (error) {
    console.error('Error updating firstname:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;