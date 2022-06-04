export class PayrollCreator {
  handle(date: string) {
    return date;
  }

  payrollForDate(date: Date) {
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return {
      baseSalaryPaymentDate: lastDayOfMonth,
    };
  }
}
