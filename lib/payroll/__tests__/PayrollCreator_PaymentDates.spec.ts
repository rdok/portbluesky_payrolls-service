import { PayrollCreator } from "../PayrollCreator";

describe("Payment dates", () => {
  it("calculates payment dates for the following 12 months", () => {
    const { payrollCreator, date, expectedPayrolls } =
      makeFactoryWithPaymentDatesForTheFollowing12Months();
    expect(payrollCreator.handle(date)).toEqual(expectedPayrolls);
  });

  it("includes the supplied date on the returned payment dates", () => {
    {
      const { payrollCreator, date } = makeFactory();
      const expected = `${date.getFullYear()}-${date.getMonth() + 1}`;
      expect(payrollCreator.handle(date)[0].month).toEqual(expected);
    }
  });

  it("ensures correct payroll calculations by setting given date to 15th", () => {
    const { payrollCreator, date } = makeFactory();
    payrollCreator.handle(date);
    expect(date.getDate()).toEqual(15);
  });
});

function makeFactory() {
  const payrollCreator = new PayrollCreator();
  const mockedBonusSalaryDate = jest.fn();
  payrollCreator.bonusSalaryDate = jest
    .fn()
    .mockReturnValue(mockedBonusSalaryDate);

  const mockedBaseSalaryDate = jest.fn();
  payrollCreator.baseSalaryDate = jest
    .fn()
    .mockReturnValue(mockedBaseSalaryDate);

  const date = new Date("2022-02-08");
  return {
    payrollCreator,
    date,
    mockedBonusSalaryDate,
    mockedBaseSalaryDate,
  };
}

function makeFactoryWithPaymentDatesForTheFollowing12Months() {
  const factory = makeFactory();

  const expectedPayrolls = [];
  const date = new Date(factory.date.getTime());
  for (let index = 1; index <= 12; index++) {
    expectedPayrolls.push({
      month: `${date.getFullYear()}-${date.getMonth() + 1}`,
      baseSalaryPaymentDate: factory.mockedBaseSalaryDate,
      bonusPaymentDate: factory.mockedBonusSalaryDate,
    });
    date.setMonth(date.getMonth() + 1);
  }

  return { ...factory, expectedPayrolls };
}
