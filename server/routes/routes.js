const express = require("express");
const router  = express.Router();  
const dashboardRoutes = require("./DashboardRoutes");
const registerLoginRoutes = require("./register-login-routes");
const projectDetailsRoutes = require("./projectDetailsRequests");
const ticketsRequests = require('./ticketsRequests');
const administrationRequests = require('./administrationRoutes');

router.use('/',registerLoginRoutes);
router.use('/dashboard',dashboardRoutes);
router.use('/dashboard/project-details',projectDetailsRoutes);
router.use('/tickets',ticketsRequests);
router.use('/administration',administrationRequests);


module.exports = router