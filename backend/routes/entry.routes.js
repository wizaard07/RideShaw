const express = require('express');
const { addEntry, getEntries, getEntry, deleteEntry, sendRequest,verifyRequest,test } = require('../controllers/entry.controller');
const verifyuser = require('../middleware/verify.js');

router = express.Router();

router.post('/add',verifyuser, addEntry);
router.get('/get', getEntries);
router.get('/get/:id',verifyuser, getEntry)
router.delete('/delete/:id',verifyuser, deleteEntry);
router.post('/req/send/:id',verifyuser, sendRequest);
router.put('/req/verify/:id',verifyuser, verifyRequest);


module.exports = router;
