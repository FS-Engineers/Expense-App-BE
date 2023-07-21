const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const forecastControllers = require('../controllers/forecast-controller')

const router = express.Router();

router.get('/forecast/:userId/:year/:month', forecastControllers.getUserForecast)

module.exports = router;