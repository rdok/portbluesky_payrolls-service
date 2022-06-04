import { DataSource } from "apollo-datasource";
import { CreatePayrollInput, PayrollMeta } from "../types.generated";
import { PayrollCreator } from "../payroll/PayrollCreator";
import { PayrollS3 } from "../payroll/PayrollS3";
import { PayrollSigner } from "../payroll/PayrollSigner";
import { PayrollTransformer } from "../payroll/PayrollTransformer";

export class PayrollDataSource extends DataSource {
  private payrollCreator: PayrollCreator;
  private payrollS3: PayrollS3;
  private payrollSigner: PayrollSigner;
  private payrollTransformer: PayrollTransformer;

  constructor(props: Props) {
    super();
    this.payrollCreator = props.payrollCreator;
    this.payrollS3 = props.payrollS3;
    this.payrollSigner = props.payrollSigner;
    this.payrollTransformer = props.payrollTransformer;
  }

  async create(input: CreatePayrollInput): Promise<PayrollMeta> {
    const payroll = this.payrollCreator.handle(input.date);
    const uploadedS3Payroll = await this.payrollS3.upload(payroll);
    await this.payrollSigner.sign(uploadedS3Payroll);

    return this.payrollTransformer.transform();
  }
}

type Props = {
  payrollCreator: PayrollCreator;
  payrollS3: PayrollS3;
  payrollSigner: PayrollSigner;
  payrollTransformer: PayrollTransformer;
};
