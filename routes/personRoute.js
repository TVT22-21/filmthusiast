const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const {addPerson, deletePerson, getPerson, updatePassword, updateEmail, checkEmail, checkUsername, checkPerson} = require('../postgre/person');
const router = express.Router();
const bcrypt = require('bcrypt');

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
            res.json({ success: true, message: 'Käyttäjän luonti onnistui' });
        } catch (error){
            res.status(500).json({ error: error.message });
            res.status(500).json({success: false, error: error.message });
        }
    }
});

router.post('/delete', upload.none(), async (req, res) => {
    const username = req.body.username;
    let password = req.body.password;
    const passwordHash = await checkPerson(username);

    if(passwordHash){
        const isCorrect = await bcrypt.compare(password, passwordHash);
        if(isCorrect){
            await deletePerson(username)
            res.json({ message: 'Käyttäjän poistaminen onnistui' });
        }else{
            res.status(401).json({error: 'INVALID PASSWORD'});
        }
    }else{
        res.status(401).json({error: 'USER NOT FOUND'});
    }
});

router.post('/updatepassword', upload.none(), async (req, res) => {
    const password = req.body.password;
    const username = req.body.username;
    const currentPassword = req.body.currentPassword;
    const passwordHash = await checkPerson(username);
    if(await checkPerson(currentPassword !== passwordHash)){
        return res.status(400).json({ error: 'Nykyinen salasana ei täsmää.' });
    }else{
        try {
            const hashPw = await bcrypt.hash(password, 10); 
            await updatePassword(hashPw, username)
            res.json({ message: 'Käyttäjän salasanan vaihto onnistui' });
        } catch(error){
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
