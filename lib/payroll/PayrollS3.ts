import { Payroll } from "./PayrollCreator";

export class PayrollS3 {
  upload(payrolls: Payroll[]) {
    return Promise.resolve(payrolls);
  }
}
