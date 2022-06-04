import { PayrollDataSource } from "../PayrollDataSource";
import { createMock } from "ts-auto-mock";
import { CreatePayrollInput, PayrollMeta } from "../../types.generated";
import { PayrollCreator } from "../../payroll/PayrollCreator";
import { PayrollS3 } from "../../payroll/PayrollS3";
import { PayrollSigner } from "../../payroll/PayrollSigner";
import { PayrollCsv } from "../../payroll/PayrollCsv";

it("creates a payroll for the given date", async () => {
  const { payrollDataSource, input, payrollCreator } = makeFactory();
  await payrollDataSource.create(input);
  expect(payrollCreator.handle).toHaveBeenCalledWith(input.date);
});

it("converts payrolls to CSV", async () => {
  const { payrollDataSource, input, payrolls, payrollCsv } = makeFactory();
  await payrollDataSource.create(input);
  expect(payrollCsv.generate).toHaveBeenCalledWith(payrolls);
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

it("includes the pre-sign url on the response", async () => {
  const { payrollDataSource, input, payrollMeta } = makeFactory();
  const response = await payrollDataSource.create(input);
  expect(response).toEqual(
    expect.objectContaining({
      PreSignedUrl: payrollMeta.PreSignedUrl,
    })
  );
});

it.skip("includes the expiration date on the response", async () => {
  const { payrollDataSource, input, payrollMeta } = makeFactory();
  const response = await payrollDataSource.create(input);
  expect(response).toEqual(payrollMeta);
});

function makeFactory() {
  const payrolls = jest.fn();
  const uploadedS3Payroll = jest.fn();
  const preSignedUrl = jest.fn() as any;
  const payrollsCsv = jest.fn();

  const payrollCreator = createMock<PayrollCreator>({
    handle: jest.fn().mockReturnValue(payrolls),
  });

  const payrollCsv = createMock<PayrollCsv>({
    generate: jest.fn().mockResolvedValue(payrollsCsv),
  });
  const payrollS3 = createMock<PayrollS3>({
    upload: jest.fn().mockResolvedValue(uploadedS3Payroll),
  });
  const payrollSigner = createMock<PayrollSigner>({
    sign: jest.fn().mockResolvedValue(preSignedUrl),
  });
  const payrollDataSource = new PayrollDataSource({
    payrollCreator,
    payrollS3,
    payrollSigner,
    payrollCsv,
  });
  const input = createMock<CreatePayrollInput>();
  const payrollMeta = createMock<PayrollMeta>({
    PreSignedUrl: preSignedUrl,
  });

  return {
    payrollDataSource,
    input,
    payrollCreator,
    payrolls,
    payrollS3,
    payrollSigner,
    uploadedS3Payroll,
    payrollMeta,
    payrollsCsv,
    payrollCsv,
  };
}
