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

const quarters = {
    "Q1": ["01", "02", "03"],
    "Q2": ["04", "05", "06"],
    "Q3": ["07", "08", "09"],
    "Q4": ["10", "11", "12"]
}

const getUserReport = async (req, res, next) => {
  const year = req.params.year;
  const month = req.params.month;
  const quarter = req.params.quarter;
  const userId = req.params.userId;


  yearOfTransactions = await transactionsAccessor.getOneYearTransactions(
    userId,
    year
  );

  if (year && !quarter && !month){
    res.json(generateReportData(yearOfTransactions, year, months))
  } else if (year && quarter && !month) {
    res.json(generateReportData(yearOfTransactions, year, quarters[quarter]))
  }

};

const generateReportData = (yearOfTransactions, year, months) => {

    let monthlyTotals = {};

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
  
      monthlyTotals[month] = { ...monthTotals, Savings: savings };
    });
  
    return(monthlyTotals);
}

exports.getUserReport = getUserReport;
