import { PayrollCreator } from "../PayrollCreator";

describe("Base salaries", () => {
  it("pays base salaries on the last day the month", () => {
    const { payrollCreator, lastDayOfMonth, date } = makeFactory();
    expect(payrollCreator.baseSalaryDate(date)).toEqual(lastDayOfMonth);
  });

  describe("pays base salaries on the Friday", function () {
    test("when last day of month is a Saturday", () => {
      const { payrollCreator, lastFridayOfMonth, saturdayLastDayOfMonth } =
        makeFactoryWithSaturdayLastDayOfMonth();
      expect(payrollCreator.baseSalaryDate(saturdayLastDayOfMonth)).toEqual(
        lastFridayOfMonth
      );
    });
    test("when last day of month is a Sunday", () => {
      const { payrollCreator, lastFridayOfMonth, sundayLastDayOfMonth } =
        makeFactoryWithSundayLastDayOfMonth();
      expect(payrollCreator.baseSalaryDate(sundayLastDayOfMonth)).toEqual(
        lastFridayOfMonth
      );
    });
  });
});

function makeFactory() {
  const payrollCreator = new PayrollCreator();
  const lastDayOfMonth = new Date("2022-01-31");
  const date = new Date("2022-01-28");
  return { payrollCreator, date, lastDayOfMonth };
}
function makeFactoryWithSaturdayLastDayOfMonth() {
  const payrollCreator = new PayrollCreator();
  const lastFridayOfMonth = new Date("2022-04-29");
  const saturdayLastDayOfMonth = new Date("2022-04-30");
  return { payrollCreator, lastFridayOfMonth, saturdayLastDayOfMonth };
}

function makeFactoryWithSundayLastDayOfMonth() {
  const payrollCreator = new PayrollCreator();
  const lastFridayOfMonth = new Date("2022-07-29");
  const sundayLastDayOfMonth = new Date("2022-07-31");
  return { payrollCreator, lastFridayOfMonth, sundayLastDayOfMonth };
}
