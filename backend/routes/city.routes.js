const express = require('express');
const { addEntry, getEntries, getEntry, deleteEntry } = require('../controllers/city.controller.js');
const verifyuser = require('../middleware/verify.js');

router = express.Router();

router.post('/add',verifyuser, addEntry);
router.get('/get',verifyuser, getEntries);
router.delete('/delete/:id',verifyuser, deleteEntry);

module.exports = router;
