import { DataSource } from "apollo-datasource";
import { CreatePayrollInput, PayrollMeta } from "../types.generated";
import { PayrollCreator } from "../payroll/PayrollCreator";
import { PayrollS3 } from "../payroll/PayrollS3";
import { PayrollSigner } from "../payroll/PayrollSigner";
import { PayrollTransformer } from "../payroll/PayrollTransformer";
import { Csv } from "../services/Csv";

export class PayrollDataSource extends DataSource {
  private payrollCreator: PayrollCreator;
  private payrollS3: PayrollS3;
  private payrollSigner: PayrollSigner;
  private payrollTransformer: PayrollTransformer;
  private csv: Csv;

  constructor(props: Props) {
    super();
    this.payrollCreator = props.payrollCreator;
    this.payrollS3 = props.payrollS3;
    this.payrollSigner = props.payrollSigner;
    this.payrollTransformer = props.payrollTransformer;
    this.csv = props.csv;
  }

  async create(input: CreatePayrollInput): Promise<PayrollMeta> {
    const payrolls = this.payrollCreator.handle(input.date);
    const payrollsCsv = await this.csv.generate(payrolls);
    const uploadedS3Payroll = await this.payrollS3.upload(payrollsCsv);
    await this.payrollSigner.sign(uploadedS3Payroll);

    return this.payrollTransformer.transform();
  }
}

type Props = {
  payrollCreator: PayrollCreator;
  payrollS3: PayrollS3;
  payrollSigner: PayrollSigner;
  payrollTransformer: PayrollTransformer;
  csv: Csv;
};
