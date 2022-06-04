import { PayrollS3 } from "./PayrollS3";
import { createMock } from "ts-auto-mock";
import { S3Client } from "@aws-sdk/client-s3";
import { Payroll } from "./PayrollCreator";
import { v4 as uuidv4 } from "uuid";

jest.mock("uuid");

it("uploads the payment dates to an s3 file", () => {
  const { payrollS3, payrolls, s3Client, id } = makeFactory();
  payrollS3.upload(payrolls);
  expect(s3Client.send).toHaveBeenCalledWith(
    expect.objectContaining({
      input: {
        Bucket: "mocked_S3_STORAGE_ARN",
        Key: `mocked_EXPIRING_PAYROLL_FILES_PREFIX/${id}.csv`,
      },
    })
  );
});

function makeFactory() {
  const s3Client = createMock<S3Client>();
  const payrollS3 = new PayrollS3({ s3Client });
  const payrolls = createMock<Payroll[]>();
  const id = "mocked_id";
  (uuidv4 as jest.Mock).mockReturnValue(id);
  return { payrollS3, payrolls, s3Client, id };
}
