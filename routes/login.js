const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const jwtController = require('../controllers/jwtController');

const {getPerson, checkPerson} = require('../postgre/person')

router.get('/', async (req,res) => {
    try {
        res.json(await getPerson());
    }catch (error){
        res.status(500).json({error: error.message});
    }
});



router.post('/login',upload.none(), async (req,res)=> {
    const username = req.body.username;
    let password = req.body.password;

    const passwordHash = await checkPerson(username);

    if(passwordHash){
        const isCorrect = await bcrypt.compare(password, passwordHash);
        if(isCorrect){
            const token = jwt.sign({username: username}, process.env.JWT_SECRET_KEY);
            res.status(200).json({jwtToken:token});
        }else{
            res.status(401).json({error: 'INVALID PASSWORD'});
        }
    }else{
        res.status(401).json({error: 'USER NOT FOUND'});
    }
});

router.get('/private', async (req,res)=>{
    const token = req.headers.authorization?.split(' ')[1];   

    try{
        const username = jwt.verify(token, process.env.JWT_SECRET_KEY).username;
        res.status(200).json({private: username});
    }catch (error){
        res.status(403).json({error: 'Access forbidden'});
    }
});

module.exports = router;