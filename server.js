const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const openai = require("openai");
const mongoose = require("mongoose");
const cors = require("cors");
const transactionsRoutes = require("./routes/transactions-routes");
const forecastRoutes = require("./routes/forecast-routes");
const reportRoutes = require("./routes/report-routes");
const chatGPTRoutes = require("./routes/chat-gpt-routes");
const axios = require("axios"); // Import axios
require("dotenv").config();

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
server.use(bodyParser.json());
server.use(cors());
server.use(transactionsRoutes);
server.use(forecastRoutes);
server.use(reportRoutes);
server.use(chatGPTRoutes);

// Your existing MongoDB connection code here

mongoose
  .connect(process.env.DB_URI + "/Expense-App-Data")
  .then(() => {
    server.listen(process.env.PORT);
    console.log("App listening at port " + process.env.PORT);
  })
  .catch((err) => {
    console.log("ERROR HAPPENING!!!");
    console.log(err);
  });
