import { DataSource } from "apollo-datasource";
import { CreatePayrollInput } from "../types.generated";
import { PayrollCreator } from "../payroll/PayrollCreator";

export class PayrollDataSource extends DataSource {
  private payrollCreator: PayrollCreator;

  constructor(props: { payrollCreator: PayrollCreator }) {
    super();
    this.payrollCreator = props.payrollCreator;
  }
  async create(input: CreatePayrollInput) {
    this.payrollCreator.handle(input.date);
    return Promise.resolve({
      CreatedAt: "bla",
      ExpiresAt: "bla",
      PreSignedUrl: "bla",
    });
  }
}
