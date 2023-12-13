const express = require('express');
const multer = require('multer');
const { addRating, getRating, getRatingid, getRatingnum, checkRatingExists, deleteRated, deleteidRated, updateRating, updateRatingText, topRating, newestRating } = require('../postgre/rated');
const upload = multer({ dest: 'upload/' });
const router = express.Router();



router.post('/addrating', async function (req, res) {
  try {
    const { idmovie, rating, ratingtext, username } = req.body;

    if (!req.body.idmovie || !req.body.rating || !req.body.ratingtext || !req.body.username) {
      return res.status(400).json({ error: 'Bad Request: Missing or invalid fields.' });
    }
    await addRating(idmovie, rating, ratingtext, ratingdate = new Date(), username);
    res.json({ message: 'Arvostelu lisätty.' });
  } catch (error) {
    console.error('Error adding rating:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/getrating', async function (req, res) {
  try {
    if (!req.query.username) {
      return res.status(400).json({ error: 'Bad Request: Missing required fields.' });
    }
    const username = req.query.username;
    const ratingData = await getRating(username);
    res.json(ratingData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/getrating/idmovie', async function (req, res) {
  try {
    if (!req.query.idmovie) {
      return res.status(400).json({ error: 'Bad Request: Missing required fields.' });
    }
    const idmovie = req.query.idmovie;
    const ratingData = await getRatingid(idmovie);
    res.json(ratingData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/getrating/rating', async function (req, res) {
  try {
    if (!req.query.rating) {
      return res.status(400).json({ error: 'Bad Request: Missing required fields.' });
    }
    const rating = req.query.rating;
    const ratingData = await getRatingnum(rating);
    res.json(ratingData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/delete', upload.none(), async (req, res) => {
  const idmovie = req.body.idmovie;
  const username = req.body.username;
  
  if (!idmovie || !username){
      return res.status(500).json({ error: 'Bad Request: Missing required fields.' });
  }else{
      try {
          await deleteRated(idmovie, username);
          res.json({ message: 'Arvostelun poistaminen onnistui' });
      } catch (error){
          res.json({error: error.message}).status(505);
      }
  }
});
router.delete('/deleteid', upload.none(), async (req, res) => {
  const idrated = req.body.idrated;
  if (!idrated){
      return res.status(500).json({ error: 'Bad Request: Missing required fields.' });
  }else{
      try {
          await deleteidRated(idrated);
          res.json({ message: 'Arvostelun poistaminen onnistui' });
      } catch (error){
          res.json({error: error.message}).status(505);
      }
  }
});

router.patch('/update/rating', async (req, res) => {
  const rating = req.body.rating;
  const idrated = req.body.idrated;
if (!rating || !idrated){
  return res.status(400).json({ error: 'Bad Request: Missing required fields.' });
}else{
  try {     
      await updateRating(rating, idrated);
      res.json({ message: 'Arvosanan vaihtaminen onnistui' });
  } catch (error){
      res.json({error: error.message}).status(505);
  }
}
});

router.patch('/update/ratingtext', async (req, res) => {
  const ratingtext = req.body.ratingtext;
  const idrated = req.body.idrated;
if (!ratingtext || !idrated){
  return res.status(400).json({ error: 'Bad Request: Missing required fields.' });
}else{
  try {     
      await updateRatingText(ratingtext, idrated);
      res.json({ message: 'Arvostelun vaihtaminen onnistui' });
  } catch (error){
      res.json({error: error.message}).status(505);
  }
}
});

router.get('/toprating', async(req,res) => {
  try {
    const topratingdata = await topRating();
    res.json(topratingdata);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/newestrating', async(req,res) => {
  try {
    const newestratingdata = await newestRating();
    res.json(newestratingdata);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;


