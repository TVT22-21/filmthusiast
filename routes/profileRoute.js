const router = require('express').Router();

const {addProfile, updateProfiletitle, updateFirstname, updateLastname, updateDescription, getProfile} = require('../postgre/profile');

router.get('/getProfile', async (req, res) => {

    try {
        res.json(await getProfile());  
        console.log(result);  
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;