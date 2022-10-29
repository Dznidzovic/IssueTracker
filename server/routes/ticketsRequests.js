const express = require("express");
const router  = express.Router();
const getUserTickets = require('../controllers/ticketControllers/getUserTickets');
const editTicket = require('../controllers/ticketControllers/editTicket')

router.use('/',getUserTickets);
router.use('/',editTicket);

module.exports = router;