const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

// Route to get total sales
router.get('/total-sales', ordersController.getTotalSales);

// Route to get sales growth rate
router.get('/sales-growth', ordersController.getSalesGrowthRate);

module.exports = router;
