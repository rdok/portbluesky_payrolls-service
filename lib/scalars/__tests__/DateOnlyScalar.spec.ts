import { DateOnlyScalar } from "../DateOnlyScalar";

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
  const invalidateDateType = 123;
  const illogicalDate = "2077-1-77";
  const invalidFormatButValidDate = "1/31/2077";

  return {
    dateOnlyScalar,
    serializedDate,
    date,
    invalidateDateType,
    illogicalDate,
    invalidFormatButValidDate,
  };
}
