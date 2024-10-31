const express = require('express');
const { addEntry, getEntries, getEntry, deleteEntry, sendRequest,verifyRequest,getPending } = require('../controllers/entry.controller');
const verifyuser = require('../middleware/verify.js');

router = express.Router();

router.post('/add',verifyuser, addEntry);
router.get('/get', getEntries);
router.get('/get/:id',verifyuser, getEntry)
router.delete('/delete/:id',verifyuser, deleteEntry);
router.post('/req/send/:id',verifyuser, sendRequest);
router.post('/req/verify',verifyuser, verifyRequest);
router.get('/req/pendings',verifyuser, getPending)


module.exports = router;
