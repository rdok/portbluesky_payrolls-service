import { PayrollCsv } from "../PayrollCsv";
import { createMock } from "ts-auto-mock";
import { Payroll } from "../PayrollCreator";

it("converts payrolls to csv", async () => {
  const { payrollCsv, payrolls } = makeFactory();
  await expect(payrollCsv.generate(payrolls)).resolves.toEqual(
    `month,baseSalaryPaymentDate,bonusPaymentDate
${payrolls[0].month},${payrolls[0].baseSalaryPaymentDate},${payrolls[0].bonusPaymentDate}
${payrolls[1].month},${payrolls[1].baseSalaryPaymentDate},${payrolls[1].bonusPaymentDate}
`
  );
});

function makeFactory() {
  const payrollCsv = new PayrollCsv();
  const payrolls = [createMock<Payroll>(), createMock<Payroll>()];
  return { payrollCsv, payrolls };
}
