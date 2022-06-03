import { DateOnlyScalar } from "../DateOnlyScalar";

it("serialises a date", () => {
  const { dateOnlyScalar, date, serializedDate } = makeFactory();

  expect(dateOnlyScalar.serialize(date)).toBe(serializedDate);
});

describe("parseValue", () => {
  it.skip("errors when date is not a string", () => {
    // tood
  });
  it.skip("errors having invalid logical dates", () => {
    // tood
  });

  it.skip("errors having invalid format but valid dates", () => {
    // tood
  });

  it.skip("parses date string to date object", () => {
    // tood
  });
});
describe("parseLiteral", () => {
  it.skip("parses a literal", () => {
    // tood
  });

  it.skip("parses literal to null having invalid type date", () => {
    // tood
  });
});

function makeFactory() {
  const dateOnlyScalar = DateOnlyScalar;
  const serializedDate = "2077-1-31";
  const date = new Date(serializedDate);
  return { dateOnlyScalar, serializedDate, date };
}
