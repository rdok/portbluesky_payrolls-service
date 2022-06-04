import { PayrollSigner } from "../PayrollSigner";
import { createMock } from "ts-auto-mock";
import { S3Client } from "@aws-sdk/client-s3";
import { PayrollS3Output } from "../PayrollS3";

it("creates a pre-signed, expiring URL for the given payroll file", async () => {
  const { payrollSigner, payrollS3Output, s3Client, getSignedUrl } =
    makeFactory();
  await payrollSigner.sign(payrollS3Output);
  expect(getSignedUrl).toHaveBeenCalledWith(
    s3Client,
    expect.objectContaining({
      input: {
        Bucket: payrollS3Output.bucket,
        Key: payrollS3Output.key,
      },
    }),
    { expiresIn: 3600 }
  );
});

it("includes the pre-signed url in the response", async () => {
  const { payrollSigner, payrollS3Output, preSignedUrl } = makeFactory();
  await expect(payrollSigner.sign(payrollS3Output)).resolves.toEqual(
    expect.objectContaining({ preSignedUrl })
  );
});

it("includes the expiration date in the response", async () => {
  const { payrollSigner, payrollS3Output, expiresAt } = makeFactory();
  await expect(payrollSigner.sign(payrollS3Output)).resolves.toEqual(
    expect.objectContaining({ expiresAt })
  );
});

function makeFactory() {
  const now = new Date("2077-01-01");
  jest.useFakeTimers().setSystemTime(now);
  const expiresAt = new Date(now.getTime());
  expiresAt.setSeconds(expiresAt.getSeconds() + 3600);

  const s3Client = createMock<S3Client>();
  const preSignedUrl = jest.fn();
  const getSignedUrl = jest.fn().mockResolvedValue(preSignedUrl) as any;
  const payrollS3Output = createMock<PayrollS3Output>();
  const payrollSigner = new PayrollSigner({ s3Client, getSignedUrl });

  return {
    payrollSigner,
    payrollS3Output,
    s3Client,
    getSignedUrl,
    preSignedUrl,
    expiresAt,
  };
}
