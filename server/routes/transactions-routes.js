const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const transactionsControllers = require('../controllers/transactions-controller')

const router = express.Router();

router.get('/', transactionsControllers.testFunction)

router.get('/transactions/:userId/:year/:month', transactionsControllers.getUserTransactions)

router.post('/create-transaction', bodyParser.json(), transactionsControllers.createTransaction)

module.exports = router;