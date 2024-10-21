const express = require('express');
const verifyuser = require('../middleware/verify.js');
const { getUser, getUserEntry, getVerified } = require('../controllers/user.controller.js');

const router = express.Router();

router.get('/get',verifyuser, getUser);
router.get('/entry',verifyuser, getUserEntry);
router.get('/pending',verifyuser,getVerified)


module.exports = router;    