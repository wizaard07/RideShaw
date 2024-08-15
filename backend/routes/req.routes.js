const express = require('express');
const router = express.Router();

const { verifyuser } = require('../middleware/verify');

router.post('/send', verifyuser, makeRequest);
router.post('/accept', verifyuser, getRequests);
router.delete('/delete/:id', verifyuser, deleteRequest);
router.get('/data', verifyuser, getRequestData);

module.exports = router;