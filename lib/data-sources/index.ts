import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { PayrollDataSource } from "./PayrollDataSource";
import { PayrollCreator } from "../payroll/PayrollCreator";
import { PayrollS3 } from "../payroll/PayrollS3";
import { PayrollSigner } from "../payroll/PayrollSigner";
import { S3Client } from "@aws-sdk/client-s3";
import { PayrollCsv } from "../payroll/PayrollCsv";

export type DataSources = {
  payrollDataSource: PayrollDataSource;
};

const payrollCreator = new PayrollCreator();
const payrollCsv = new PayrollCsv();

const s3Client = new S3Client({ region: process.env.AWS_REGION });
const payrollS3 = new PayrollS3({ s3Client });
const payrollSigner = new PayrollSigner({ s3Client, getSignedUrl });

const payrollDataSource = new PayrollDataSource({
  payrollCreator,
  payrollS3,
  payrollSigner,
  payrollCsv,
});

export const dataSources = (): DataSources => ({
  payrollDataSource,
});
