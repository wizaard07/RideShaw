const express = require('express');
const { addEntry, getEntries, getEntry, deleteEntry, sendRequest,verifyRequest } = require('../controllers/city.controller.js');
const verifyuser = require('../middleware/verify.js');
const { verify } = require('jsonwebtoken');

router = express.Router();

router.post('/add',verifyuser, addEntry);
router.get('/get',verifyuser, getEntries);
router.delete('/delete/:id',verifyuser, deleteEntry);
router.post('/req/send',verifyuser, sendRequest);
router.post('/req/verify',verifyuser, verifyRequest);


module.exports = router;
