import { PayrollCreator } from "../PayrollCreator";

it("pays bonuses for the previous month, on the 15th", () => {
  const { payrollCreator, paymentDate15th, date } = makeFactory();
  expect(payrollCreator.bonusSalaryDate(date)).toEqual(paymentDate15th);
});

it("pays bonuses on the first Wednesday after 15th, when 15th is Saturday", () => {
  const { payrollCreator, firstWednesdayAfter15th, date } =
    makeFactoryWith15thSaturday();
  expect(payrollCreator.bonusSalaryDate(date)).toEqual(firstWednesdayAfter15th);
});

it("pays bonuses on the first Wednesday after 15th, when 15th is Sunday", () => {
  const { payrollCreator, firstWednesdayAfter15th, date } =
    makeFactoryWith15thSunday();
  expect(payrollCreator.bonusSalaryDate(date)).toEqual(firstWednesdayAfter15th);
});

function makeFactory() {
  const payrollCreator = new PayrollCreator();
  const paymentDate15th = "2022-2-15";
  const date = new Date("2022-01-08");
  return { payrollCreator, date, paymentDate15th };
}

function makeFactoryWith15thSaturday() {
  const payrollCreator = new PayrollCreator();
  const firstWednesdayAfter15th = "2022-1-19";
  const date = new Date("2021-12-07");
  return {
    payrollCreator,
    firstWednesdayAfter15th,
    date,
  };
}
function makeFactoryWith15thSunday() {
  const payrollCreator = new PayrollCreator();
  const date = new Date("2022-04-22");
  const firstWednesdayAfter15th = "2022-5-18";
  return {
    payrollCreator,
    firstWednesdayAfter15th,
    date,
  };
}
