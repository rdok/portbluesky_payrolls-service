import { Payroll } from "./PayrollCreator";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommandInput } from "@aws-sdk/client-s3/dist-types/commands/PutObjectCommand";

export class PayrollS3 {
  private s3Client: S3Client;

  constructor(props: { s3Client: S3Client }) {
    this.s3Client = props.s3Client;
  }

  async upload(payrolls: string) {
    const params: PutObjectCommandInput = {
      Bucket: process.env.S3_STORAGE_ARN,
      Key: `${process.env.EXPIRING_PAYROLL_FILES_PREFIX}/${uuidv4()}.csv`,
      Body: payrolls,
    };
    await this.s3Client.send(new PutObjectCommand(params));
    return Promise.resolve(payrolls);
  }
}
