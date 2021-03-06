import { DataSource } from "apollo-datasource";
import { CreatePayrollInput, PayrollMeta } from "../types.generated";
import { PayrollCreator } from "../payroll/PayrollCreator";
import { PayrollS3 } from "../payroll/PayrollS3";
import { PayrollSigner } from "../payroll/PayrollSigner";
import { PayrollCsv } from "../payroll/PayrollCsv";

export class PayrollDataSource extends DataSource {
  private payrollCreator: PayrollCreator;
  private payrollS3: PayrollS3;
  private payrollSigner: PayrollSigner;
  private payrollCsv: PayrollCsv;

  constructor(props: Props) {
    super();
    this.payrollCreator = props.payrollCreator;
    this.payrollS3 = props.payrollS3;
    this.payrollSigner = props.payrollSigner;
    this.payrollCsv = props.payrollCsv;
  }

  async create(input: CreatePayrollInput): Promise<PayrollMeta> {
    const payrolls = this.payrollCreator.handle(input.startDate);
    const payrollsCsv = await this.payrollCsv.generate(payrolls);
    const payrollS3Output = await this.payrollS3.upload(payrollsCsv);
    const preSignedUrl = await this.payrollSigner.sign(payrollS3Output);

    return {
      ExpiresAt: preSignedUrl.expiresAt.toISOString(),
      PreSignedUrl: preSignedUrl.preSignedUrl,
    };
  }
}

type Props = {
  payrollCreator: PayrollCreator;
  payrollS3: PayrollS3;
  payrollSigner: PayrollSigner;
  payrollCsv: PayrollCsv;
};
