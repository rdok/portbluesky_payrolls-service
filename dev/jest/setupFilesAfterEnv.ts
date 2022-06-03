global.console = {
  ...global.console,
  log: jest.fn(),
};

beforeEach(() => {
  process.env.ENVIRONMENT_VARIABLE = "mocked_ENVIRONMENT_VARIABLE";
});

afterEach(() => {
  // To mock modules from reusable make functions.
  // Achieves cleaner and easier to read unit tests.
  jest.resetModules();
  // jest.resetAllMocks();
});
