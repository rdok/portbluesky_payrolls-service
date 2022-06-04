global.console = {
  ...global.console,
  log: jest.fn(),
};

beforeEach(() => {
  process.env.S3_STORAGE_ARN = "mocked_S3_STORAGE_ARN";
  process.env.EXPIRING_PAYROLL_FILES_PREFIX =
    "mocked_EXPIRING_PAYROLL_FILES_PREFIX";
});

afterEach(() => {
  // To mock modules from reusable make functions.
  // Achieves cleaner and easier to read unit tests.
  jest.resetModules();
  // jest.resetAllMocks();
});
