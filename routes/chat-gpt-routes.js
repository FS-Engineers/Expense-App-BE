const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const chatGPTControllers = require('../controllers/chat-gpt-controller')

const router = express.Router();

router.post('/chat-gpt', chatGPTControllers.postChatGPTResponse)

module.exports = router;