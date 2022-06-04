import { DateOnlyScalar } from "../DateOnlyScalar";
import { AST } from "prettier";
import { Kind } from "graphql";

it("serialises a date", () => {
  const { dateOnlyScalar, date, serializedDate } = makeFactory();
  expect(dateOnlyScalar.serialize(date)).toBe(serializedDate);
});

describe("parseValue", () => {
  it("errors when date is not a string", () => {
    const { dateOnlyScalar, invalidateDateType } = makeFactory();
    expect(() => dateOnlyScalar.parseValue(invalidateDateType)).toThrowError();
  });
  it("errors having invalid logical dates", () => {
    const { dateOnlyScalar, illogicalDate } = makeFactory();
    expect(() => dateOnlyScalar.parseValue(illogicalDate)).toThrowError();
  });

  it("errors having invalid format but valid dates", () => {
    const { dateOnlyScalar, invalidFormatButValidDate } = makeFactory();
    expect(() =>
      dateOnlyScalar.parseValue(invalidFormatButValidDate)
    ).toThrowError();
  });

  it("parses date string to date object", () => {
    const { dateOnlyScalar, serializedDate, date } = makeFactory();
    expect(dateOnlyScalar.parseValue(serializedDate).toDateString()).toEqual(
      date.toDateString()
    );
  });
});

describe("parseLiteral", () => {
  it("parses date string to date object", () => {
    const { dateOnlyScalar, date, astDate } = makeFactory();
    const actualDate = (
      dateOnlyScalar.parseLiteral(astDate) as Date
    ).toDateString();

    expect(actualDate).toEqual(date.toDateString());
  });

  it("errors having invalid type date", () => {
    const { dateOnlyScalar, invalidAstDate } = makeFactory();
    expect(() => dateOnlyScalar.parseLiteral(invalidAstDate)).toThrowError();
  });
});

function makeFactory() {
  const dateOnlyScalar = DateOnlyScalar;
  const serializedDate = "2077-1";
  const date = new Date(serializedDate);
  const invalidateDateType = 123;
  const illogicalDate = "2077-77";
  const invalidFormatButValidDate = "1/1/2077";
  const astDate: AST = {
    kind: Kind.STRING,
    toString: () => serializedDate,
  };
  const invalidAstDate: AST = { kind: Kind.INT };

  return {
    dateOnlyScalar,
    serializedDate,
    date,
    invalidateDateType,
    illogicalDate,
    invalidFormatButValidDate,
    astDate,
    invalidAstDate,
  };
}
