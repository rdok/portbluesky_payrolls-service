import { DataSource } from "apollo-datasource";
import { CreatePayrollInput } from "../types.generated";
import { PayrollCreator } from "../payroll/PayrollCreator";
import { PayrollS3 } from "../payroll/PayrollS3";
import { PayrollSigner } from "../payroll/PayrollSigner";

export class PayrollDataSource extends DataSource {
  private payrollCreator: PayrollCreator;
  private payrollS3: PayrollS3;
  private payrollSigner: PayrollSigner;

  constructor(props: Props) {
    super();
    this.payrollCreator = props.payrollCreator;
    this.payrollS3 = props.payrollS3;
    this.payrollSigner = props.payrollSigner;
  }
  async create(input: CreatePayrollInput) {
    const payroll = await this.payrollCreator.handle(input.date);
    const uploadedS3Payroll = await this.payrollS3.upload(payroll);
    await this.payrollSigner.sign(uploadedS3Payroll);
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
  payrollSigner: PayrollSigner;
};
