const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const forecastingControllers = require('../controllers/forecasting-controller')

const router = express.Router();

router.get('/forecasting/:userId/:year/:month', forecastingControllers.getUserForecast)

module.exports = router;