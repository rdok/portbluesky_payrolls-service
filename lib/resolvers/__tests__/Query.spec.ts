import { resolvers } from "../index";

it("queries health check", () => {
  expect(resolvers.Query.healthCheck()).toEqual("alive");
});
