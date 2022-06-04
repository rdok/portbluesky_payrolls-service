export type Payroll = {
  month: string;
  baseSalaryPaymentDate: string;
  bonusPaymentDate: string;
};

export class PayrollCreator {
  handle(date: Date): Payroll[] {
    const payrolls = [];
    for (let index = 1; index <= 12; index++) {
      payrolls.push({
        month: `${date.getFullYear()}-${date.getMonth() + 1}`,
        baseSalaryPaymentDate: this.baseSalaryDate(date),
        bonusPaymentDate: this.bonusSalaryDate(date),
      });
      date.setMonth(date.getMonth() + 1);
    }

    return payrolls;
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

    return `${lastDayOfMonth.getFullYear()}-${
      lastDayOfMonth.getMonth() + 1
    }-${lastDayOfMonth.getDate()}`;
  }

  bonusSalaryDate(date: Date) {
    const paymentDate = date;
    paymentDate.setDate(15);

    const isSaturday = paymentDate.getDay() === 6;
    if (isSaturday) paymentDate.setDate(paymentDate.getDate() + 4);

    return `${paymentDate.getFullYear()}-${
      paymentDate.getMonth() + 1
    }-${paymentDate.getDate()}`;
  }
}
