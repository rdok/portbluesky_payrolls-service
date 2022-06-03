import { Context } from "../config";
import { MutationCreatePayrollArgs, PayrollMeta } from "../types.generated";

export const Mutation = {
  async createPayroll(
    param: any,
    args: MutationCreatePayrollArgs,
    context: Context
  ): Promise<PayrollMeta> {
    return context.dataSources.payrollDataSource.create(
      args.createPayrollInput
    );
  },
};
