import { PayrollDataSource } from "./PayrollDataSource";

export type DataSources = {
  payrollDataSource: PayrollDataSource;
};

export const dataSources = (): DataSources => ({
  payrollDataSource: new PayrollDataSource(),
});
