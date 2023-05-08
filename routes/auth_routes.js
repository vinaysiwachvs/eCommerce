const express = require("express");
const router = express.Router();
const {createUser,getUser} = require('../controller/user_controller');

router.post('/register',createUser);
router.get('/',getUser);
module.exports = router; 