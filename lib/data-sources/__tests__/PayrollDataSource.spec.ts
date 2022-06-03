import { PayrollDataSource } from "../PayrollDataSource";
import { createMock } from "ts-auto-mock";
import { CreatePayrollInput } from "../../types.generated";
import { PayrollCreator } from "../../payroll/PayrollCreator";

it("creates a payroll for the given date", async () => {
  const { payrollDataSource, input, payrollCreator } = makeFactory();

  await payrollDataSource.create(input);

  expect(payrollCreator.handle).toHaveBeenCalledWith(input.date);
});

// it("uploads the payroll as CSV in S3");
//
// it("generates a pre signed url for the S3 payroll file");
//
// it("responds with payroll meta");

function makeFactory() {
  const payrollCreator = createMock<PayrollCreator>();
  const payrollDataSource = new PayrollDataSource({ payrollCreator });
  const input = createMock<CreatePayrollInput>();

  return { payrollDataSource, input, payrollCreator };
}
