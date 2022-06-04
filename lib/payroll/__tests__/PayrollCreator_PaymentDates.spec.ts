import { PayrollCreator } from "../PayrollCreator";

describe("Payment dates", () => {
  // it.each([
  //   "2022-01-14",
  //   "2022-02-01",
  //   "2022-03-01",
  //   "2022-04-01",
  //   "2022-05-01",
  //   "2022-06-01",
  //   "2022-07-01",
  //   "2022-08-01",
  //   "2022-09-01",
  //   "2022-10-01",
  //   "2022-11-01",
  //   "2022-12-01",
  // ])("uses subsequent %s next month when calculating payroll", (input) => {
  //   const result = oneUpperCaseRule(input);
  //   payrollCreator.handle(input);
  //   expect(payrollCreator.baseSalaryDate).toHaveBeenNthCalledWith(1, );
  // });

  // it.skip("uses subsequent next 12 months dates", () => {
  //   const { payrollCreator, date } = makeFactory();
  //   payrollCreator.handle(date);
  //   expect(payrollCreator.baseSalaryDate).toHaveBeenNthCalledWith();
  // });
  it("returns payment dates for the following 12 months", () => {
    const {
      payrollCreator,
      date,
      mockedBaseSalaryDate,
      mockedBonusSalaryDate,
    } = makeFactory();

    expect(payrollCreator.handle(date)).toEqual([
      {
        month: "2022-2",
        baseSalaryPaymentDate: mockedBaseSalaryDate,
        bonusPaymentDate: mockedBonusSalaryDate,
      },
      {
        month: "2022-3",
        baseSalaryPaymentDate: mockedBaseSalaryDate,
        bonusPaymentDate: mockedBonusSalaryDate,
      },
      {
        month: "2022-4",
        baseSalaryPaymentDate: mockedBaseSalaryDate,
        bonusPaymentDate: mockedBonusSalaryDate,
      },
      {
        month: "2022-5",
        baseSalaryPaymentDate: mockedBaseSalaryDate,
        bonusPaymentDate: mockedBonusSalaryDate,
      },
      {
        month: "2022-6",
        baseSalaryPaymentDate: mockedBaseSalaryDate,
        bonusPaymentDate: mockedBonusSalaryDate,
      },
      {
        month: "2022-7",
        baseSalaryPaymentDate: mockedBaseSalaryDate,
        bonusPaymentDate: mockedBonusSalaryDate,
      },
      {
        month: "2022-8",
        baseSalaryPaymentDate: mockedBaseSalaryDate,
        bonusPaymentDate: mockedBonusSalaryDate,
      },
      {
        month: "2022-9",
        baseSalaryPaymentDate: mockedBaseSalaryDate,
        bonusPaymentDate: mockedBonusSalaryDate,
      },
      {
        month: "2022-10",
        baseSalaryPaymentDate: mockedBaseSalaryDate,
        bonusPaymentDate: mockedBonusSalaryDate,
      },
      {
        month: "2022-11",
        baseSalaryPaymentDate: mockedBaseSalaryDate,
        bonusPaymentDate: mockedBonusSalaryDate,
      },
      {
        month: "2022-12",
        baseSalaryPaymentDate: mockedBaseSalaryDate,
        bonusPaymentDate: mockedBonusSalaryDate,
      },
      {
        month: "2023-1",
        baseSalaryPaymentDate: mockedBaseSalaryDate,
        bonusPaymentDate: mockedBonusSalaryDate,
      },
    ]);
  });

  it.skip("includes the supplied date on the returned payment dates", () => {
    // TODO
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
