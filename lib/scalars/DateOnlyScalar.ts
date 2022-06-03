import { Kind } from "graphql";
import { UserInputError } from "apollo-server-lambda";

const error = "Expected date format: 01/31/2020";

export const DateOnlyScalar = {
  name: "DateOnly",
  description: "ISO date, custom scalar type. Example: 2020-1-31",
  serialize(value: unknown) {
    const date = value as Date;
    const month = date.getMonth() + 1;
    return `${date.getFullYear()}-${month}-${date.getDate()}`;
  },
  parseValue(value: any) {
    if (typeof value !== "string") throw new UserInputError(error);

    const date = new Date(value);

    if (isNaN(date.getDate())) throw new UserInputError(error);
  },
};
