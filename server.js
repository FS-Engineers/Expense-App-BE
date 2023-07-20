const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const transactionsRoutes = require("./routes/transactions-routes");
const forecastingRoutes = require("./routes/forecasting-routes")



server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.use(transactionsRoutes);
server.use(forecastingRoutes);

mongoose
  .connect('mongodb://127.0.0.1:27017/Expense-App-Data')//I changed the connection string
  .then(() => {
    server.listen(8080);
    console.log("App listen at port 8080");

  })
  .catch(err => {
    console.log("ERROR HAPPENING!!!")
    console.log(err);
  });

