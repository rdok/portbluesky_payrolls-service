import { ApolloServer } from "apollo-server";
import {
  addToContext,
  dataSources,
  plugins,
  resolvers,
  typeDefs,
} from "../lib";
import { Request, Response } from "express-serve-static-core";

import envJson from "../.env.json";

const environmentVariables = envJson.GraphQL as any;

for (const envKey in environmentVariables) {
  process.env[envKey] = environmentVariables[envKey];
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: (props: { req: Request; res: Response }) =>
    addToContext({ ...props }),
  plugins,
});

server.listen(3081, "0.0.0.0").then(() => {
  console.log(`Server ready at http://127.0.0.1:3081/graphql`);
});
