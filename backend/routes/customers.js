const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customersController');

// Route to get new customers
router.get('/new-customers', customersController.getNewCustomers);

// Route to get repeat customers
router.get('/repeat-customers', customersController.getRepeatCustomers);

// Route to get geographical distribution
router.get('/geographical-distribution', customersController.getGeographicalDistribution);

// Route to get lifetime value by cohorts
router.get('/lifetime-value', customersController.getLifetimeValue);

module.exports = router;
