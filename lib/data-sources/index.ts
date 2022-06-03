import { PayrollDataSource } from "./PayrollDataSource";
import { PayrollCreator } from "../payroll/PayrollCreator";
import { PayrollS3 } from "../payroll/PayrollS3";
import { PayrollSigner } from "../payroll/PayrollSigner";

export type DataSources = {
  payrollDataSource: PayrollDataSource;
};

const payrollCreator = new PayrollCreator();
const payrollS3 = new PayrollS3();
const payrollSigner = new PayrollSigner();
const payrollDataSource = new PayrollDataSource({
  payrollCreator,
  payrollS3,
  payrollSigner,
});

export const dataSources = (): DataSources => ({
  payrollDataSource,
});
