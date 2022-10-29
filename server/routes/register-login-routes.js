const express = require("express");
const router  = express.Router();  

const registerRoutes = require("../controllers/registerControllers/register");
const loginRoutes = require("../controllers/loginControllers/login");
const passResetRequest = require("../controllers/passwordResetControllers/PasswordResetRequest");
const passResetConfirmation = require("../controllers/passwordResetControllers/passwordResetConfirmation");
const emailExists = require('../controllers/registerControllers/emailexists');
const userExists = require('../controllers/userControllers/userexists');
const tokenExists = require('../controllers/tokenControllers/tokenexists');
const verifyLink = require('../controllers/passwordResetControllers/verifyLink');
const authentication = require('../controllers/Authentication');

router.use('/',registerRoutes);
router.use('/',loginRoutes);
router.use('/',passResetRequest);
router.use('/',passResetConfirmation);
router.use('/',emailExists);
router.use('/',userExists);
router.use('/',tokenExists);
router.use('/',verifyLink)
router.use('/',authentication);
module.exports = router;