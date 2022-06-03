import {
  APIGatewayProxyCallback,
  APIGatewayProxyEvent,
} from "aws-lambda/trigger/api-gateway-proxy";
import { createMock } from "ts-auto-mock";
import { Context } from "aws-lambda";
import { handler } from "../graphql";

test("GraphQL lambda runs successfully", async () => {
  const { event, context, callback } = await makeGraphQLHandler();

  const response = await handler(event, context, callback);

  expect(response).toMatchObject({
    body: '{"data":{"healthCheck":"alive"}}\n',
    statusCode: 200,
  });
});

async function makeGraphQLHandler(): Promise<any> {
  const event = createMock<APIGatewayProxyEvent>({
    isBase64Encoded: false,
    httpMethod: "POST",
    path: "/",
    multiValueHeaders: {
      "Content-Type": ["application/json"],
    },
    body: JSON.stringify({ query: "{ healthCheck }" }),
  });
  const context = createMock<Context>();
  const callback = createMock<APIGatewayProxyCallback>();
  return { event, context, callback };
}
