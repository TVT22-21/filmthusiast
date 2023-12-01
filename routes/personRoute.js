const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const {addPerson, deletePerson, getPerson, updatePassword, updateEmail, checkEmail, checkUsername} = require('../postgre/person');
const router = express.Router();
const bcrypt = require('bcrypt');
const { createToken } = require('../auth/auth');

router.post('/register', upload.none(), async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    if(!username || !password || !email){
        return res.status(400).json({ error: 'Käyttäjänimi, salasana ja email tarvitaan.' });
    }else{
        try{
            if(await checkUsername(username)){
                return res.status(400).json({ error: 'Käyttäjätunnus on varattu.' });
            }
            
            if(await checkEmail(email)){
                return res.status(400).json({ error: 'Email on jo käytössä.' });
            }      

            const hashPw = await bcrypt.hash(password, 10);
            const createdate = new Date();
            await addPerson(username, hashPw, email, createdate);
            const token = createToken(username);
            res.status(200).json({jwtToken : token});
            res.json({ success: true, message: 'Käyttäjän luonti onnistui' });
        } catch (error){
            res.status(500).json({ error: error.message });
            res.status(500).json({success: false, error: error.message });
        }
    }
});

router.post('/delete', upload.none(), async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password){
        return res.status(400).json({ error: 'Käyttäjänimi ja salasana tarvitaan.' });
    }else{
        try {
            await deletePerson(username, password);
            res.json({ message: 'Käyttäjän poistaminen onnistui' });
        } catch (error){
            res.json({error: error.message}).status(505);
        }
    }
});

router.post('/updatepassword', upload.none(), async (req, res) => {
    const password = req.body.password;
    const username = req.body.username;
    if (!password || !username){
        return res.status(400).json({ error: 'Käyttäjänimi ja salasana tarvitaan.' });
    }else{
        try {
            const hashPw = await bcrypt.hash(password, 10); 
            await updatePassword(hashPw, username);
            res.json({ message: 'Käyttäjän salasanan vaihto onnistui' });
        } catch (error){
            res.json({error: error.message}).status(505);
        }
    }
});

router.post('/updateemail', upload.none(), async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
if (!username || !email){
    return res.status(400).json({ error: 'Käyttäjänimi ja email tarvitaan.' });
}else{
    try {
        if(await checkEmail(email)){
            return res.status(400).json({ error: 'Email on jo käytössä.' });
        }      
        await updateEmail(email, username);
        res.json({ message: 'Käyttäjän emailin vaihtaminen onnistui' });
    } catch (error){
        res.json({error: error.message}).status(505);
    }
}
});

router.get('/getPerson', async (req, res) => {
    const username = req.query.username;
    if (!username) {
        return res.status(400).json({ error: 'Käyttäjänimi tarvitaan.' });
    }else{
        try {
            const personData = await getPerson(username);
            res.json(personData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
});


module.exports = router;
