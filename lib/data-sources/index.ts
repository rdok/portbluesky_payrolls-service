import { PayrollDataSource } from "./PayrollDataSource";
import { PayrollCreator } from "../payroll/PayrollCreator";

export type DataSources = {
  payrollDataSource: PayrollDataSource;
};

const payrollCreator = new PayrollCreator();

export const dataSources = (): DataSources => ({
  payrollDataSource: new PayrollDataSource({ payrollCreator }),
});
