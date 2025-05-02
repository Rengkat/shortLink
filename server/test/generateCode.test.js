const generateCode = require("../utils/generateCode");
describe("URL encoding Algorithm", () => {
  const code = generateCode(6);
  test("should generate a 6 character string", () => {
    expect(code).toHaveLength(6);
  });
  test("should contain alphanumeric characters", () => {
    expect(code).toMatch(/^[a-zA-Z0-9]+$/);
  });
});
