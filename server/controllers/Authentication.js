const express = require('express');
const router = express.Router();
const auth = require('../services/auth');

router.get("/auth-endpoint",auth);

module.exports = router;