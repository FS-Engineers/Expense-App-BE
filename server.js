const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const openai = require('openai');
const mongoose = require('mongoose');
const cors = require('cors');
const transactionsRoutes = require('./routes/transactions-routes');
const forecastRoutes = require('./routes/forecast-routes');
const reportRoutes = require('./routes/report-routes');
const axios = require('axios'); // Import axios
require('dotenv').config();

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

server.use(transactionsRoutes);
server.use(forecastRoutes);
server.use(reportRoutes);
server.use(bodyParser.json());
server.use(cors());

// Your existing MongoDB connection code here

// Add the new endpoint for ChatGPT integration
server.post('/chat-gpt', async (req, res) => {
  const { data } = req.body;

  try {
    // Assuming you have set the API key in a .env file as CHATGPT_API_KEY
    const apiKey = process.env.CHATGPT_API_KEY;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };

    // Make a POST request to the ChatGPT API endpoint
    const chatGptResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: data,
          },
        ],
      },
      { headers }
    );

    // Extracting the chatGptResponse data and sending it back to the frontend
    res.json({ response: chatGptResponse.data.choices[0].message.content });
  } catch (error) {
    console.error('Error communicating with ChatGPT API:', error.message);
    res.status(500).json({ error: 'Error processing the request' });
  }
});

mongoose
  .connect(process.env.DB_URI + '/Expense-App-Data')
  .then(() => {
    server.listen(process.env.PORT);
    console.log('App listening at port ' + process.env.PORT);
  })
  .catch((err) => {
    console.log('ERROR HAPPENING!!!');
    console.log(err);
  });
