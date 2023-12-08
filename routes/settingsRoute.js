const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {deletePerson, updateEmail, updatePassword} = require('../postgre/person')

router.delete('/deletePerson', async (req, res) => {
    const { username, password } = req.params;
    try {
      await deletePerson(username, password);
      res.status(200).json({ message: 'Profile deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error.' });
    }
  });

  module.exports = router;