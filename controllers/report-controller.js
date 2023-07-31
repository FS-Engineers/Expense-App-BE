const transactionsAccessor = require("../accessors/transactions-accessor");
const dateHandler = require("../controllers/date-handler");
const forecastController = require("../controllers/forecast-controller");

const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const monthsStrings = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const quarters = {
  1: ["01", "02", "03"],
  2: ["04", "05", "06"],
  3: ["07", "08", "09"],
  4: ["10", "11", "12"],
};

const quartersStrings = {
  1: ["January", "February", "March"],
  2: ["April", "May", "June"],
  3: ["July", "August", "September"],
  4: ["October", "November", "December"],
};

const categories = [
  // "Home",
  // "Health",
  // "Transportation",
  // "Food",
  // "Education",
  // "Entertainment",
  // "Shopping",
  "Income",
  "Expense",
  "Savings",
];

const getUserReport = async (req, res, next) => {
  const year = req.params.year;
  const month = req.params.month;
  const quarter = req.params.quarter;
  const userId = req.params.userId;

  yearOfTransactions = await transactionsAccessor.getOneYearTransactions(
    userId,
    year
  );

  if (year && !quarter && !month) {
    res.json(
      generateReportData(yearOfTransactions, year, months, monthsStrings)
    );
  } else if (year && quarter && !month) {
    res.json(
      generateReportData(
        yearOfTransactions,
        year,
        quarters[quarter],
        quartersStrings[quarter]
      )
    );
  }
};

const generateReportData = (yearOfTransactions, year, months, labels) => {
  let monthlyTotals = [];

  months.map((month) => {
    let [startDate, endDate] = dateHandler.processOneMonthDates(year, month);

    // get all data for the month
    const monthTransactions = yearOfTransactions.filter(
      (transaction) =>
        transaction.date >= new Date(startDate) &&
        transaction.date < new Date(endDate)
    );

    // total expenses for the month
    const monthTotals =
      forecastController.calcOneMonthTotals(monthTransactions);

    const savings = monthTotals.Income - monthTotals.Expense;

    monthlyTotals.push({ ...monthTotals, Savings: savings, Month: month });
  });

  const response = {};
  categories.map((category) => {
    const catArray = [];
    monthlyTotals.map((monthTotal) => {
      catArray.push(monthTotal[category]);
    });

    response[category] = catArray;
  });

  console.log(response);
  // console.log(months)
  console.log(labels);

  return { labels, datasets: { ...response } };
};

exports.getUserReport = getUserReport;
