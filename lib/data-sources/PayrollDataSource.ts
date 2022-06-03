import { DataSource } from "apollo-datasource";
import { CreatePayrollInput } from "../types.generated";

export class PayrollDataSource extends DataSource {
  async create(input: CreatePayrollInput) {
    return Promise.resolve({
      CreatedAt: "bla",
      ExpiresAt: "bla",
      PreSignedUrl: "bla",
    });
  }
}
