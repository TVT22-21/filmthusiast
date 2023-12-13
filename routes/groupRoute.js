const express = require('express');
const router = express.Router();
const groupController = require('../postgre/group');


router.get('/', groupController.getAllGroups);


router.post('/create', groupController.createGroup);


router.post('/join', groupController.joinGroup);

module.exports = router;