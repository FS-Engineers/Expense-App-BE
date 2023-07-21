const Transaction = require("../models/transaction");
const dateHandler = require("../controllers/date-handler");

const testFunction = async (req, res, next) => {
  res.send({ message: "it works!" });
};

const getUserTransactions = async (req, res, next) => {
  // Get all user transactions
  const userId = req.params.userId;
  const year = req.params.year;
  const month = req.params.month;

  const [startDate, endDate] = dateHandler.processOneMonthDates(year, month);

  let transactions;
  try {
    transactions = await Transaction.find({
      userId: userId,
      date: { $gte: new Date(startDate), $lt: new Date(endDate) },
    });
  } catch (err) {
    console.log(err);
    return next();
  }

  res.json({ transactions });
};

const createTransaction = async (req, res, next) => {
  const {
    userId,
    date,
    accountId,
    amount,
    category,
    vendor,
    subcategory,
    wns,
  } = req.body;

  const createdTransaction = new Transaction({
    userId,
    date,
    accountId,
    amount,
    category,
    vendor,
    subcategory,
    wns,
  });

  try {
    await createdTransaction.save();
  } catch (err) {
    console.log("ERROR in creating transaction object in DB");
    console.log(err);
    return next();
  }

  res.status(201).json({ transaction: createdTransaction });
};

exports.testFunction = testFunction;
exports.getUserTransactions = getUserTransactions;
exports.createTransaction = createTransaction;
