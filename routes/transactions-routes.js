const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const transactionsControllers = require("../controllers/transactions-controller");

const router = express.Router();

router.get("/", async (req, res, next) => {
    console.log("in healthcheck!!!!!!!!!!!!!!")
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };
  try {
    console.log("HERE")
    res.send(healthcheck);
  } catch (error) {
    console.log("here")
    healthcheck.message = error;
    res.status(503).send();
  }
});

router.get(
  "/transactions/:userId/:year/:month",
  transactionsControllers.getUserTransactions
);

router.post(
  "/create-transaction",
  bodyParser.json(),
  transactionsControllers.createTransaction
);

module.exports = router;
