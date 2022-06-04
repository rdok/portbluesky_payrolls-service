import { PayrollDataSource } from "../PayrollDataSource";
import { createMock } from "ts-auto-mock";
import { CreatePayrollInput, PayrollMeta } from "../../types.generated";
import { PayrollCreator } from "../../payroll/PayrollCreator";
import { PayrollS3 } from "../../payroll/PayrollS3";
import { PayrollSigner } from "../../payroll/PayrollSigner";
import { PayrollTransformer } from "../../payroll/PayrollTransformer";
import { Csv } from "../../services/Csv";

it("creates a payroll for the given date", async () => {
  const { payrollDataSource, input, payrollCreator } = makeFactory();
  await payrollDataSource.create(input);
  expect(payrollCreator.handle).toHaveBeenCalledWith(input.date);
});

it("converts payrolls to CSV", async () => {
  const { payrollDataSource, input, payrolls, csv } = makeFactory();
  await payrollDataSource.create(input);
  expect(csv.generate).toHaveBeenCalledWith(payrolls);
});

it("uploads the payroll CSV in S3", async () => {
  const { payrollDataSource, input, payrollS3, payrollsCsv } = makeFactory();
  await payrollDataSource.create(input);
  expect(payrollS3.upload).toHaveBeenCalledWith(payrollsCsv);
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
  const payrolls = jest.fn();
  const uploadedS3Payroll = jest.fn();
  const payrollMeta = createMock<PayrollMeta>();
  const payrollsCsv = jest.fn();

  const payrollCreator = createMock<PayrollCreator>({
    handle: jest.fn().mockReturnValue(payrolls),
  });

  const csv = createMock<Csv>({
    generate: jest.fn().mockResolvedValue(payrollsCsv),
  });
  const payrollS3 = createMock<PayrollS3>({
    upload: jest.fn().mockResolvedValue(uploadedS3Payroll),
  });
  const payrollTransformer = createMock<PayrollTransformer>({
    transform: jest.fn().mockReturnValue(payrollMeta),
  });
  const payrollSigner = createMock<PayrollSigner>({
    sign: jest.fn().mockResolvedValue(uploadedS3Payroll),
  });
  const payrollDataSource = new PayrollDataSource({
    payrollCreator,
    payrollS3,
    payrollSigner,
    payrollTransformer,
    csv,
  });
  const input = createMock<CreatePayrollInput>();

  return {
    payrollDataSource,
    input,
    payrollCreator,
    payrolls,
    payrollS3,
    payrollSigner,
    uploadedS3Payroll,
    payrollTransformer,
    payrollMeta,
    payrollsCsv,
    csv,
  };
}
