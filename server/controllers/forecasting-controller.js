const Transaction = require("../models/transaction");
const dateHandler = require("../controllers/date-handler");

const categories = [
  "Home",
  "Health",
  "Transportation",
  "Food",
  "Education",
  "Entertainment",
  "Shopping",
  "Income",
];

const getUserForecast = async (req, res, next) => {
  // Get all user transactions
  const userId = req.params.userId;
  const year = req.params.year;
  const month = req.params.month;

  const [startDate, endDate] = dateHandler.processDates(year, month);

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

  // TODO: also make sure this can handle if the category is not found

  // Calculate totals for each category
  let totals = {};

  categories.map((category) => {
    const catAmt = transactions
      .filter((transac) => transac.category == category)
      .map((item) => item.amount);
    
    totals[category] = catAmt.length > 0 ? catAmt.reduce((prev, next) => prev + next) : 0;
  });

  // aggretate total expense
  let totalExpense = 0;
  categories.map((category) => {
    if (category != "Income") {
      totalExpense += totals[category];
    }
  });

  totals["Expense"] = totalExpense;

  const response = {
    "expenses": {...totals},
    "budget": {
      "Home": 100,
      "Health": 100,
      "Transportation": 100,
      "Food": 100,
      "Education": 100,
      "Entertainment": 100,
      "Shopping": 100
    }
  }

  res.json(response);
};

exports.getUserForecast = getUserForecast;
