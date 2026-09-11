const { calculate, parseArguments } = require("../calculator");

describe("calculate", () => {
  describe("image examples", () => {
    test("adds 2 and 3", () => {
      expect(calculate(2, "+", 3)).toBe(5);
    });

    test("subtracts 4 from 10", () => {
      expect(calculate(10, "-", 4)).toBe(6);
    });

    test("multiplies 45 by 2", () => {
      expect(calculate(45, "*", 2)).toBe(90);
    });

    test("divides 20 by 5", () => {
      expect(calculate(20, "/", 5)).toBe(4);
    });
  });

  describe("supported operations", () => {
    test.each([
      ["addition", 1.5, "+", 2.5, 4],
      ["subtraction", -3, "-", -2, -1],
      ["multiplication", -4, "*", 2.5, -10],
      ["division", 7, "/", 2, 3.5],
    ])("performs %s", (_operation, first, operator, second, expected) => {
      expect(calculate(first, operator, second)).toBe(expected);
    });

    test.each([
      ["add", 2, 3, 5],
      ["subtract", 10, 4, 6],
      ["multiply", 45, 2, 90],
      ["divide", 20, 5, 4],
    ])("accepts the %s operation name", (operation, first, second, expected) => {
      expect(calculate(first, operation, second)).toBe(expected);
    });
  });

  describe("validation", () => {
    test("rejects division by zero", () => {
      expect(() => calculate(20, "/", 0)).toThrow("Cannot divide by zero.");
    });

    test("rejects non-numeric operands", () => {
      expect(() => calculate("20", "+", 5)).toThrow(
        "Operands must be valid numbers."
      );
      expect(() => calculate(20, "+", Number.NaN)).toThrow(
        "Operands must be valid numbers."
      );
    });

    test("rejects unsupported operations", () => {
      expect(() => calculate(2, "%", 3)).toThrow(
        "Unsupported operation. Use add, subtract, multiply, or divide."
      );
    });
  });
});

describe("parseArguments", () => {
  test("parses three CLI arguments", () => {
    expect(parseArguments(["20", "/", "5"])).toEqual({
      firstOperand: 20,
      operation: "/",
      secondOperand: 5,
    });
  });

  test("parses decimal and negative operands", () => {
    expect(parseArguments(["-3.5", "*", "2"])).toEqual({
      firstOperand: -3.5,
      operation: "*",
      secondOperand: 2,
    });
  });

  test("preserves invalid numeric values for calculate to validate", () => {
    expect(parseArguments(["not-a-number", "+", "2"])).toEqual({
      firstOperand: NaN,
      operation: "+",
      secondOperand: 2,
    });
  });

  test("rejects missing or extra arguments", () => {
    expect(() => parseArguments(["2", "+"])).toThrow(
      "Usage: node src/calculator.js <number> <operation> <number>"
    );
    expect(() => parseArguments(["2", "+", "3", "extra"])).toThrow(
      "Usage: node src/calculator.js <number> <operation> <number>"
    );
  });
});
