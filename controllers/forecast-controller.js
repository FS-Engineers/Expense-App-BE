const transactionsAccessor = require("../accessors/transactions-accessor");
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

  // get all transactions for given month
  const transactions = await transactionsAccessor.getOneMonthTransactions(
    userId,
    year,
    month
  );

  // calculate totals for each category
  const totals = calcOneMonthTotals(transactions);

  // calculate threeMonthAvg
  const threeMonthAvg = await calcThreeMonthAvg(userId, year, month);

  // put everything together
  let response = {};
  categories.map((category) => {
    response[category] = {
      expense: totals[category],
      budget: threeMonthAvg[category],
    };
  });
  delete response.Income
  // response["Expense"] = {
  //   expense: Math.round(totals.Expense * 100) / 100,
  //   budget: threeMonthAvg.Expense,
  // };

  res.json(response);
};

const calcOneMonthTotals = (transactions) => {
  // Calculate totals for each category
  let totals = {};

  categories.map((category) => {
    const catAmt = transactions
      .filter((transac) => transac.category == category)
      .map((item) => item.amount);

    totals[category] =
      catAmt.length > 0 ? -1 * catAmt.reduce((prev, next) => prev + next) : 0;
  });
  // make sure income is not a neg number
  totals["Income"] = totals["Income"] * -1;

  // aggretate total expense
  let totalExpense = 0;
  categories.map((category) => {
    if (category != "Income") {
      totalExpense += totals[category];
    }
  });

  totals["Expense"] = totalExpense;

  return totals;
};

const calcThreeMonthAvg = async (userId, year, month) => {
  // get all user transactions for 3 months
  const threeMonthTransactions =
    await transactionsAccessor.getThreeMonthTransactions(userId, year, month);

  // calc average for each category based on 3 month data
  let avgs = {};

  categories.map((category) => {
    const catAmt = threeMonthTransactions
      .filter((transac) => transac.category == category)
      .map((item) => item.amount);

    avgs[category] =
      catAmt.length > 0
        ? -1 * Math.round(catAmt.reduce((prev, next) => prev + next) / 3)
        : 0;
  });
  // make sure income is not a neg number
  avgs["Income"] = avgs["Income"] * -1;

  // aggretate avgs expense
  let totalExpenseAvg = 0;
  categories.map((category) => {
    if (category != "Income") {
      totalExpenseAvg += avgs[category];
    }
  });

  avgs["Expense"] = totalExpenseAvg;

  return avgs;
};

exports.getUserForecast = getUserForecast;
exports.calcOneMonthTotals = calcOneMonthTotals;