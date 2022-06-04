export class PayrollCreator {
  handle(date: string) {
    return date;
  }

  baseSalaryDate(date: Date) {
    const lastDayOfMonth = date;
    lastDayOfMonth.setDate(1);
    lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);
    lastDayOfMonth.setDate(lastDayOfMonth.getDate() - 1);

    const isSaturday = lastDayOfMonth.getDay() === 6;
    if (isSaturday) lastDayOfMonth.setDate(lastDayOfMonth.getDate() - 1);

    const isSunday = lastDayOfMonth.getDay() === 0;
    if (isSunday) lastDayOfMonth.setDate(lastDayOfMonth.getDate() - 2);

    return lastDayOfMonth;
  }
}
