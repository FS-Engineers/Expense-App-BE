const processDates = (year, month) => {

  const startMonthVal = Number(month);
  const endMonthVal = startMonthVal == 12 ? 1 : startMonthVal + 1;
  const endYearVal = startMonthVal == 12 ? Number(year) + 1 : Number(year);

  const startString =
    startMonthVal < 10
      ? year + "-" + "0" + String(startMonthVal)
      : year + "-" + String(startMonthVal);
  const endString =
    endMonthVal < 10
      ? String(endYearVal) + "-" + "0" + String(endMonthVal)
      : String(endYearVal) + "-" + String(endMonthVal);

  return [startString, endString];
};

exports.processDates = processDates;
