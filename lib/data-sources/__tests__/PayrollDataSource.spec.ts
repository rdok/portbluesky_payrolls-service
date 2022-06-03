import { PayrollDataSource } from "../PayrollDataSource";
import { createMock } from "ts-auto-mock";
import { CreatePayrollInput, PayrollMeta } from "../../types.generated";
import { PayrollCreator } from "../../payroll/PayrollCreator";
import { PayrollS3 } from "../../payroll/PayrollS3";
import { PayrollSigner } from "../../payroll/PayrollSigner";
import { PayrollTransformer } from "../../payroll/PayrollTransformer";

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

it("generates a pre signed url for the S3 payroll file", async () => {
  const { payrollDataSource, input, payrollSigner, uploadedS3Payroll } =
    makeFactory();
  await payrollDataSource.create(input);
  expect(payrollSigner.sign).toHaveBeenCalledWith(uploadedS3Payroll);
});

it("responds with payroll meta", async () => {
  const { payrollDataSource, input, payrollMeta } = makeFactory();
  const response = await payrollDataSource.create(input);
  expect(response).toEqual(payrollMeta);
});

function makeFactory() {
  const payrollFile = jest.fn();
  const uploadedS3Payroll = jest.fn();
  const payrollMeta = createMock<PayrollMeta>();

  const payrollS3 = createMock<PayrollS3>({
    upload: jest.fn().mockResolvedValue(uploadedS3Payroll),
  });
  const payrollTransformer = createMock<PayrollTransformer>({
    transform: jest.fn().mockReturnValue(payrollMeta),
  });
  const payrollSigner = createMock<PayrollSigner>({
    sign: jest.fn().mockResolvedValue(uploadedS3Payroll),
  });
  const payrollCreator = createMock<PayrollCreator>({
    handle: jest.fn().mockResolvedValue(payrollFile),
  });
  const payrollDataSource = new PayrollDataSource({
    payrollCreator,
    payrollS3,
    payrollSigner,
    payrollTransformer,
  });
  const input = createMock<CreatePayrollInput>();

  return {
    payrollDataSource,
    input,
    payrollCreator,
    payrollFile,
    payrollS3,
    payrollSigner,
    uploadedS3Payroll,
    payrollTransformer,
    payrollMeta,
  };
}
