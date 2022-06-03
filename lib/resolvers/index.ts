import { Query } from "./Query";
import { Mutation } from "./Mutation";
import { payrollDateScalar } from "../scalars/payrollDateScalar";

const resolvers = {
  PayrollDate: payrollDateScalar,
  Query,
  Mutation,
};

export { resolvers };
