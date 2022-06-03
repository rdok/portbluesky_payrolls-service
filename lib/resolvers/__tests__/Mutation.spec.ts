import { resolvers } from "../index";
import { Context } from "../../config";
import { createMock } from "ts-auto-mock";
import { MutationCreatePayrollArgs, PayrollMeta } from "../../types.generated";
import { PayrollDataSource } from "../../data-sources/PayrollDataSource";

it("creates a payroll", async () => {
  const { context, payrollMeta, args } = makeFactory();
  expect(await resolvers.Mutation.createPayroll(null, args, context)).toEqual(
    payrollMeta
  );
});

function makeFactory() {
  const context = createMock<Context>();
  const payrollMeta = createMock<PayrollMeta>();
  context.dataSources.payrollDataSource = createMock<PayrollDataSource>({
    create: jest.fn().mockResolvedValue(payrollMeta),
  });
  const args = createMock<MutationCreatePayrollArgs>();

  return { context, payrollMeta, args };
}
