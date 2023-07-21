const processOneMonthDates = (year, month) => {

  const startMonthVal = Number(month);
  const endMonthVal = startMonthVal == 12 ? 1 : startMonthVal + 1;
  const endYearVal = startMonthVal == 12 ? Number(year) + 1 : Number(year);

  const startString = constructDateString(year, startMonthVal);
  const endString = constructDateString(endYearVal, endMonthVal);

  return [startString, endString];
};

const processThreeMonthDates = (year, month) => {
  const endMonthVal = Number(month);
  const endYearVal = Number(year);

  const startMonthVal = endMonthVal > 3 ? endMonthVal - 3 : endMonthVal + 9;
  const startYearVal = endMonthVal > 3 ? endYearVal : endYearVal - 1;

  const startString = constructDateString(startYearVal, startMonthVal);
  const endString = constructDateString(endYearVal, endMonthVal);

  return [startString, endString];

}

const constructDateString = (year, month) => {
  const dateString =
  month < 10
    ? year + "-" + "0" + String(month)
    : year + "-" + String(month);

  return dateString;
}

exports.processOneMonthDates = processOneMonthDates;
exports.processThreeMonthDates = processThreeMonthDates;
