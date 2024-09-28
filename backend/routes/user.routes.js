const express = require('express');
const verifyuser = require('../middleware/verify.js');
const { getUser, getUserEntry } = require('../controllers/user.controller.js');

const router = express.Router();

router.get('/get',verifyuser, getUser);
router.get('/entry',verifyuser, getUserEntry);

module.exports = router;    