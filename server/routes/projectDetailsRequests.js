const express = require("express");
const router  = express.Router();
const getProject = require("../controllers/projectControllers/getProject");
const getUserByContributors = require("../controllers/userControllers/getUsersByContributors");
const getAvailableUsers = require('../controllers/userControllers/getAvailableUsers');
const updateProjectContributors = require('../controllers/projectControllers/updateContributors');
const deleteMember = require('../controllers/projectControllers/deleteMember');
const getAllTickets = require('../controllers/ticketControllers/getTickets');
const createTicket = require('../controllers/ticketControllers/createTicket');
const getUsersForTickets = require('../controllers/ticketControllers/getUsersForTickets');
const deleteTicket = require('../controllers/ticketControllers/deleteTicket');
const createComment = require('../controllers/commentControllers/createComment');
const getComments = require('../controllers/commentControllers/getComments');
const deleteCommments = require('../controllers/commentControllers/deleteComments');

router.use('/',getProject)
router.use('/',getUserByContributors);
router.use('/',getAvailableUsers);
router.use('/',updateProjectContributors);
router.use('/',deleteMember);
router.use('/',getAllTickets);
router.use('/',createTicket);
router.use('/',getUsersForTickets);
router.use('/',deleteTicket);
router.use('/',createComment);
router.use('/',getComments);
router.use('/',deleteCommments);

module.exports = router;