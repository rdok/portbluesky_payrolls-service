import { GraphQLScalarType, Kind } from "graphql";
import { UserInputError } from "apollo-server-lambda";

const error = "Expected date format: 01/31/2020";

export const payrollDateScalar = new GraphQLScalarType({
  name: "PayrollDate",
  description: "Date custom scalar type. Example: 31-01-2020",
  serialize(value) {
    return value;
  },
  parseValue(value) {
    if (typeof value !== "string") throw new UserInputError(error);

    const date = new Date(value);

    if (isNaN(date.getDay())) throw new UserInputError(error);

    return value;
  },
  parseLiteral(value) {
    if (value.kind === Kind.STRING) return value as unknown;

    throw new UserInputError(error);
  },
});
