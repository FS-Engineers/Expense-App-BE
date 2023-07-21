const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const transactionsRoutes = require("./routes/transactions-routes");
const forecastRoutes = require("./routes/forecast-routes")
require('dotenv').config()


server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.use(transactionsRoutes);
server.use(forecastRoutes);

mongoose
  .connect(process.env.DB_URI + '/Expense-App-Data')//I changed the connection string
  .then(() => {
    server.listen(process.env.PORT);
    console.log("App listening at port "+ process.env.PORT);

  })
  .catch(err => {
    console.log("ERROR HAPPENING!!!")
    console.log(err);
  });

