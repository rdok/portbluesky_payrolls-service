import { Query } from "./Query";
import { Mutation } from "./Mutation";
import { GraphQLScalarType } from "graphql";
import { DateOnlyScalar } from "../scalars/DateOnlyScalar";

const resolvers = {
  DateOnly: new GraphQLScalarType(DateOnlyScalar),
  Query,
  Mutation,
};

export { resolvers };
