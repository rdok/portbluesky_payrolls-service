import { ApolloServer } from "apollo-server-lambda";
import { APIGatewayProxyEvent } from "aws-lambda";
import { Request, Response } from "express-serve-static-core";

import {
  Context,
  addToContext,
  dataSources,
  resolvers,
  typeDefs,
  plugins,
} from "../lib";

const graphql = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: (props: {
    event: APIGatewayProxyEvent;
    context: Context;
    express: { req: Request; res: Response };
  }) => addToContext({ ...props.express }),
  plugins,
});

const { CORS_ORIGINS_COMMA_DELIMITED = "" } = process.env;
const origin = CORS_ORIGINS_COMMA_DELIMITED.split(",");

export const handler = graphql.createHandler({
  // https://github.com/expressjs/cors#configuration-options
  expressGetMiddlewareOptions: {
    cors: { origin, credentials: true },
  },
});
