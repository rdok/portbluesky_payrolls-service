import { Payroll } from "./PayrollCreator";
import stringify from "csv-stringify/lib/sync";

export class PayrollCsv {
  generate(payrolls: Payroll[]) {
    return new Promise((resolve, reject) => {
      try {
        const csv = stringify(payrolls, {
          columns: ["month", "baseSalaryPaymentDate", "bonusPaymentDate"],
          header: true,
        });
        resolve(csv);
      } catch (e) {
        reject(e);
      }
    });
  }
}
