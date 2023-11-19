const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const {addPerson, deletePerson, getPerson, updatePassword, updateEmail} = require('../postgre/person');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/register', upload.none(), async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    
    try{
        const hashPw = await bcrypt.hash(password, 10);
        const createdate = new Date();
        await addPerson(username, hashPw, email, createdate);
        res.json({ message: 'Käyttäjän luonti onnistui' });
    } catch (error){
        res.json({error: error.message}).status(505);
    }
});

router.post('/delete', upload.none(), async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        await deletePerson(username, password);
        res.json({ message: 'Käyttäjän poistaminen onnistui' });
    } catch (error){
        res.json({error: error.message}).status(505);
    }
});

router.post('/updatepassword', upload.none(), async (req, res) => {
    const password = req.body.password;
    const username = req.body.username;
    try {
        const hashPw = await bcrypt.hash(password, 10); 
        await updatePassword(hashPw, username);
        res.json({ message: 'Käyttäjän salasanan vaihto onnistui' });
    } catch (error){
        res.json({error: error.message}).status(505);
    }
});

router.post('/updateemail', upload.none(), async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    try {
        await updateEmail(email, username);
        res.json({ message: 'Käyttäjän emailin vaihtaminen onnistui' });
    } catch (error){
        res.json({error: error.message}).status(505);
    }
});


module.exports = router;
