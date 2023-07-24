const Transaction = require("../models/transaction");
const dateHandler = require("../controllers/date-handler");

const getOneMonthTransactions = async (userId, year, month) => {
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

  return transactions;
};

const getThreeMonthTransactions = async (userId, year, month) => {
  const [startDate, endDate] = dateHandler.processThreeMonthDates(year, month);

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

  return transactions;
};

const getOneYearTransactions = async (userId, year) => {
    const [startDate, endDate] = dateHandler.processOneYearDates(year);
  
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
  
    // console.log(transactions);
    return transactions;
  };

exports.getOneMonthTransactions = getOneMonthTransactions;
exports.getThreeMonthTransactions = getThreeMonthTransactions;
exports.getOneYearTransactions = getOneYearTransactions;