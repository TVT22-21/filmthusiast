const express = require('express');
const {updateProfiletitle, updateFirstname, updateLastname, updateDescription, 
getProfile, getWatchlist, addToWatchlist, deleteFromWatchlist, deleteProfile, createProfile} = require('../postgre/profileController');
const router = express.Router();



router.post('/createProfile', async function(req, res){
  try {
    if (!req.body) {
      return res.status(400).json({ error: 'Bad Request: Missing required fields.' });
    }
    const { profiletitle, firstname, lastname, description, person_idperson } = req.body;
    await createProfile(profiletitle, firstname, lastname, description, person_idperson);
    res.json({ message: 'Profile created successfully.' });
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.delete('/deleteProfile', async function(req, res){
  try {
    if (!req.body || !req.body.person_idperson) {
      return res.status(400).json({ error: 'Bad Request: Missing required fields.' });
    }
    const { person_idperson } = req.body;
    await deleteProfile(person_idperson);
    res.json({ message: 'Profile deleted successfully.' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.put('/updateFirstname', async (req, res) => {
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

router.put('/updateLastname', async (req, res) => {
  try {
    if (!req.body || !req.body.firstname || !req.body.person_idperson) {
      return res.status(400).json({ error: 'Bad Request: Missing required fields.' });
    }
    const { lastname, person_idperson } = req.body;
    await updateLastname(lastname, person_idperson);
    res.json({ message: 'Lastname updated successfully.' });
  } catch (error) {
    console.error('Error updating Lastname:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/updateTitle', async (req, res) => {
  try {
    if (!req.body || !req.body.profiletitle || !req.body.person_idperson) {
      return res.status(400).json({ error: 'Bad Request: Missing required fields.' });
    }
    const { profiletitle, person_idperson } = req.body;
    await updateProfiletitle(profiletitle, person_idperson);
    res.json({ message: 'Profiletitle updated successfully.' });
  } catch (error) {
    console.error('Error updating profiletitle:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/updateDescription', async (req, res) => {
  try {
    if (!req.body || !req.body.description || !req.body.person_idperson) {
      return res.status(400).json({ error: 'Bad Request: Missing required fields.' });
    }
    const { description, person_idperson } = req.body;
    await updateDescription(description, person_idperson);
    res.json({ message: 'Description updated successfully.' });
  } catch (error) {
    console.error('Error updating description:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/addToWatchlist', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: 'Bad Request: Missing required fields.' });
    }
    const { movie_id, person_idperson } = req.body;
    console.log(req.body);
    await addToWatchlist(movie_id, person_idperson);
    res.json({ message: 'Watchlist updated successfully.' });
  } catch (error) {
    console.error('Error updating watchlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/deleteFromWatchlist', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: 'Bad Request: Missing required fields.' });
    }
    const { movie_id, person_idperson } = req.body;
    console.log(req.body);
    await deleteFromWatchlist(movie_id, person_idperson);
    res.json({ message: 'Movie deleted from watchlist successfully.' });
  } catch (error) {
    console.error('Error updating watchlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getWatchlist/:username', async (req, res) => {

  try {  
    if (!req.body) {
      return res.status(400).json({ error: 'Bad Request: Missing required fields.' });
    } 
    const username = req.params.username;
    const profileData = await getWatchlist(username);
    res.json(profileData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/getProfile/:username', async (req, res) => {

  try {  
    if (!req.body) {
      return res.status(400).json({ error: 'Bad Request: Missing required fields.' });
    } 
    const username = req.params.username;
    const profileData = await getProfile(username);
    res.json(profileData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;