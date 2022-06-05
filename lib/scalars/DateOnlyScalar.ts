import { Kind } from "graphql";
import { UserInputError } from "apollo-server-lambda";
import { AST } from "prettier";

const error = "Expected date format: 2020-1";

export const DateOnlyScalar = {
  name: "DateOnly",
  description: "ISO date, custom scalar type. Format: YYYY-mm Example: 2020-1",
  serialize(value: unknown) {
    const date = value as Date;
    const month = date.getMonth() + 1;
    return `${date.getFullYear()}-${month}`;
  },
  parseValue(value: any) {
    if (typeof value !== "string") throw new UserInputError(error);

    const date = new Date(value);

    if (isNaN(date.getDate())) throw new UserInputError(error);

    if (!/^\d{4}-\d{1,2}$/.test(value)) throw new UserInputError(error);

    return new Date(value);
  },
  parseLiteral(value: AST) {
    if (value.kind === Kind.STRING) return new Date(value as unknown as string);

    throw new UserInputError(error);
  },
};
