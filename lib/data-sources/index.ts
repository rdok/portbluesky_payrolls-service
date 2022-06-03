import { PayrollDataSource } from "./PayrollDataSource";
import { PayrollCreator } from "../payroll/PayrollCreator";
import { PayrollS3 } from "../payroll/PayrollS3";

export type DataSources = {
  payrollDataSource: PayrollDataSource;
};

const payrollCreator = new PayrollCreator();
const payrollS3 = new PayrollS3();

export const dataSources = (): DataSources => ({
  payrollDataSource: new PayrollDataSource({ payrollCreator, payrollS3 }),
});
