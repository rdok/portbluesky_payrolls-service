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

function makeFactory() {
  const s3Client = createMock<S3Client>();
  const getSignedUrl = jest.fn() as any;
  const payrollS3Output = createMock<PayrollS3Output>();
  const payrollSigner = new PayrollSigner({ s3Client, getSignedUrl });

  return { payrollSigner, payrollS3Output, s3Client, getSignedUrl };
}
