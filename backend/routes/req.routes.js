const express = require('express');
const router = express.Router();

const { verifyuser } = require('../middleware/verify');

router.post('/make', verifyuser, makeRequest);
router.get('/get', verifyuser, getRequests);
router.delete('/delete/:id', verifyuser, deleteRequest);

module.exports = router;