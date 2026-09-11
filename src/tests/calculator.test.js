const {
  calculate,
  modulo,
  power,
  squareRoot,
  parseArguments,
} = require("../calculator");

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

    test("calculates modulo with 5 % 2", () => {
      expect(calculate(5, "%", 2)).toBe(1);
    });

    test("calculates power with 2 ^ 3", () => {
      expect(calculate(2, "^", 3)).toBe(8);
    });

    test("calculates square root with sqrt 16", () => {
      expect(calculate(16, "sqrt")).toBe(4);
    });
  });

  describe("supported operations", () => {
    test.each([
      ["addition", 1.5, "+", 2.5, 4],
      ["subtraction", -3, "-", -2, -1],
      ["multiplication", -4, "*", 2.5, -10],
      ["division", 7, "/", 2, 3.5],
      ["modulo", 17, "%", 5, 2],
      ["power", 2, "^", 3, 8],
    ])("performs %s", (_operation, first, operator, second, expected) => {
      expect(calculate(first, operator, second)).toBe(expected);
    });

    test.each([
      ["add", 2, 3, 5],
      ["subtract", 10, 4, 6],
      ["multiply", 45, 2, 90],
      ["divide", 20, 5, 4],
      ["modulo", 17, 5, 2],
      ["power", 2, 3, 8],
      ["mod", 5, 2, 1],
      ["exponentiation", 2, 3, 8],
    ])("accepts the %s operation name", (operation, first, second, expected) => {
      expect(calculate(first, operation, second)).toBe(expected);
    });

    test.each([
      ["sqrt", 81, 9],
      ["squareRoot", 16, 4],
      ["square-root", 0, 0],
    ])("accepts %s as a square-root operation", (operation, value, expected) => {
      expect(calculate(value, operation)).toBe(expected);
    });
  });

  describe("validation", () => {
    test("rejects division by zero", () => {
      expect(() => calculate(20, "/", 0)).toThrow("Cannot divide by zero.");
      expect(() => modulo(20, 0)).toThrow("Cannot divide by zero.");
    });

    test("handles modulo with negative operands", () => {
      expect(modulo(-17, 5)).toBe(-2);
      expect(modulo(17, -5)).toBe(2);
    });

    test("handles zero and negative exponents", () => {
      expect(power(0, 3)).toBe(0);
      expect(power(2, -2)).toBe(0.25);
    });

    test("rejects square roots of negative numbers", () => {
      expect(() => squareRoot(-1)).toThrow(
        "Cannot calculate the square root of a negative number."
      );
      expect(() => calculate(-16, "sqrt")).toThrow(
        "Cannot calculate the square root of a negative number."
      );
    });

    test("rejects non-numeric operands", () => {
      expect(() => calculate("20", "+", 5)).toThrow(
        "Operands must be valid numbers."
      );
      expect(() => calculate(20, "+", Number.NaN)).toThrow(
        "Operands must be valid numbers."
      );
      expect(() => modulo(Number.POSITIVE_INFINITY, 2)).toThrow(
        "Operands must be valid numbers."
      );
      expect(() => power(2, Number.NaN)).toThrow(
        "Operands must be valid numbers."
      );
      expect(() => squareRoot(Number.NaN)).toThrow(
        "Operand must be a valid number."
      );
    });

    test("rejects unsupported operations", () => {
      expect(() => calculate(2, "log", 3)).toThrow(
        "Unsupported operation. Use add, subtract, multiply, divide, modulo, power, or squareRoot."
      );
    });
  });
});

describe("standalone operations", () => {
  test("calculates modulo", () => {
    expect(modulo(10, 3)).toBe(1);
  });

  test("calculates powers", () => {
    expect(power(2, 4)).toBe(16);
  });

  test("calculates square roots", () => {
    expect(squareRoot(2 ** 2)).toBe(2);
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

  test("parses a square-root CLI argument", () => {
    expect(parseArguments(["81", "sqrt"])).toEqual({
      firstOperand: 81,
      operation: "sqrt",
      secondOperand: undefined,
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
      "Usage: node src/calculator.js <number> <operation> [number]"
    );
    expect(() => parseArguments(["2", "+", "3", "extra"])).toThrow(
      "Usage: node src/calculator.js <number> <operation> [number]"
    );
  });
});
