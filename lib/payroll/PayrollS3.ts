import {
  PutObjectCommand,
  S3Client,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

export class PayrollS3 {
  private s3Client: S3Client;

  constructor(props: { s3Client: S3Client }) {
    this.s3Client = props.s3Client;
  }

  async upload(payrolls: string): Promise<PayrollS3Output> {
    const params: PutObjectCommandInput = {
      Bucket: process.env.S3_STORAGE_ARN,
      Key: `${process.env.EXPIRING_PAYROLL_FILES_PREFIX}/${uuidv4()}.csv`,
      Body: payrolls,
    };

    if (!params.Bucket) throw new Error("Missing bucket variable.");
    if (!params.Key) throw new Error("Missing key variable.");

    await this.s3Client.send(new PutObjectCommand(params));

    return { bucket: params.Bucket, key: params.Key };
  }
}

export type PayrollS3Output = {
  bucket: string;
  key: string;
};
