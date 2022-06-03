import { DataSource } from "apollo-datasource";
import { CreatePayrollInput } from "../types.generated";
import { PayrollCreator } from "../payroll/PayrollCreator";
import { PayrollS3 } from "../payroll/PayrollS3";

export class PayrollDataSource extends DataSource {
  private payrollCreator: PayrollCreator;
  private payrollS3: PayrollS3;

  constructor(props: Props) {
    super();
    this.payrollCreator = props.payrollCreator;
    this.payrollS3 = props.payrollS3;
  }
  async create(input: CreatePayrollInput) {
    const payroll = await this.payrollCreator.handle(input.date);
    this.payrollS3.upload(payroll);
    return Promise.resolve({
      CreatedAt: "bla",
      ExpiresAt: "bla",
      PreSignedUrl: "bla",
    });
  }
}

type Props = {
  payrollCreator: PayrollCreator;
  payrollS3: PayrollS3;
};
