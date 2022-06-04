import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PayrollS3Output } from "./PayrollS3";

export class PayrollSigner {
  private readonly s3Client: S3Client;
  private readonly getSignedUrl: typeof getSignedUrl;

  constructor(props: {
    s3Client: S3Client;
    getSignedUrl: typeof getSignedUrl;
  }) {
    this.s3Client = props.s3Client;
    this.getSignedUrl = props.getSignedUrl;
  }

  async sign(payrollS3Output: PayrollS3Output): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: payrollS3Output.bucket,
      Key: payrollS3Output.key,
    });
    const expiresInAnHour = 3600;
    return this.getSignedUrl(this.s3Client, command, {
      expiresIn: expiresInAnHour,
    });
  }
}
