const express = require("express");
const router  = express.Router();

const getAllTickets = require('../controllers/ticketControllers/getTickets');
const getAllProjects = require('../controllers/projectControllers/getProjects');
const deleteProject = require('../controllers/projectControllers/deleteProject');
const getUsers = require("../controllers/userControllers/getUsers");
const newProject = require('../controllers/projectControllers/newProject');



router.use('/',getAllTickets);
router.use('/',getAllProjects);
router.use('/',deleteProject);
router.use('/',getUsers);
router.use('/',newProject);




module.exports = router;