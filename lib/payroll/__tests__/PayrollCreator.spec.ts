// - Sales staff are paid a regular ﬁxed base salary each month, plus a regular monthly bonus.
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

describe("Bonuses", () => {
  it.skip("pays bonuses for the previous month, on the 15th of each month", () => {
    // TODO
  });

  it.skip("pays bonuses on the first Wednesday after 15th, when 15th is a weekend day", () => {
    // TODO
  });
});

describe("Payment dates", () => {
  it.skip("returns payment dates for the following 12 months", () => {
    // TODO
  });

  it.skip("includes the supplied date on the returned payment dates", () => {
    // TODO
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
