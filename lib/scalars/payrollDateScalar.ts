import { GraphQLScalarType, Kind } from "graphql";
import { UserInputError } from "apollo-server-lambda";

const error = "Expected date format: 01/31/2020";

export const payrollDateScalar = new GraphQLScalarType({
  name: "PayrollDate",
  description: "Date only, custom scalar type. Example: 2020-01-31",
  serialize(value) {
    return (value as Date).getTime();
  },
  parseValue(value) {
    if (typeof value !== "string") throw new UserInputError(error);

    const date = new Date(value);

    if (isNaN(date.getDay())) throw new UserInputError(error);

    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new UserInputError(error);

    return new Date(value);
  },
  parseLiteral(value) {
    if (value.kind === Kind.STRING) return new Date(value as unknown as string);

    return null;
  },
});
