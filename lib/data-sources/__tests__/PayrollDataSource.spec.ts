import { PayrollDataSource } from "../PayrollDataSource";
import { createMock } from "ts-auto-mock";
import { CreatePayrollInput } from "../../types.generated";
import { PayrollCreator } from "../../payroll/PayrollCreator";
import { PayrollS3 } from "../../payroll/PayrollS3";

it("creates a payroll for the given date", async () => {
  const { payrollDataSource, input, payrollCreator } = makeFactory();
  await payrollDataSource.create(input);
  expect(payrollCreator.handle).toHaveBeenCalledWith(input.date);
});

it("uploads the payroll as CSV in S3", async () => {
  const { payrollDataSource, input, payrollS3, payrollFile } = makeFactory();
  await payrollDataSource.create(input);
  expect(payrollS3.upload).toHaveBeenCalledWith(payrollFile);
});
//
// it("generates a pre signed url for the S3 payroll file");
//
// it("responds with payroll meta");

function makeFactory() {
  const payrollFile = jest.fn();
  const payrollS3 = createMock<PayrollS3>();
  const payrollCreator = createMock<PayrollCreator>({
    handle: jest.fn().mockResolvedValue(payrollFile),
  });
  const payrollDataSource = new PayrollDataSource({
    payrollCreator,
    payrollS3,
  });
  const input = createMock<CreatePayrollInput>();

  return { payrollDataSource, input, payrollCreator, payrollFile, payrollS3 };
}
