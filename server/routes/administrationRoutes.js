const express = require('express');
const router = express.Router();
const editUser = require('../controllers/userControllers/editUser');
const deleteUser = require('../controllers/userControllers/deleteUser');

router.use('/',editUser);
router.use('/',deleteUser);

module.exports = router;
