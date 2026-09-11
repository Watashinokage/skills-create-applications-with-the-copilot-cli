#!/usr/bin/env node

/**
 * Calculate a result using a supported operation.
 */
function calculate(firstOperand, operator, secondOperand) {
  if (operator === "sqrt" || operator === "squareRoot" || operator === "square-root") {
    return squareRoot(firstOperand);
  }

  if (!Number.isFinite(firstOperand) || !Number.isFinite(secondOperand)) {
    throw new Error("Operands must be valid numbers.");
  }

  switch (operator) {
    case "+":
    case "add":
      return firstOperand + secondOperand;
    case "-":
    case "subtract":
      return firstOperand - secondOperand;
    case "*":
    case "multiply":
      return firstOperand * secondOperand;
    case "/":
    case "divide":
      if (secondOperand === 0) {
        throw new Error("Cannot divide by zero.");
      }
      return firstOperand / secondOperand;
    case "%":
    case "modulo":
    case "mod":
      return modulo(firstOperand, secondOperand);
    case "^":
    case "power":
    case "exponentiation":
      return power(firstOperand, secondOperand);
    default:
      throw new Error(
        "Unsupported operation. Use add, subtract, multiply, divide, modulo, power, or squareRoot."
      );
  }
}

function modulo(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new Error("Operands must be valid numbers.");
  }
  if (b === 0) {
    throw new Error("Cannot divide by zero.");
  }
  return a % b;
}

function power(base, exponent) {
  if (!Number.isFinite(base) || !Number.isFinite(exponent)) {
    throw new Error("Operands must be valid numbers.");
  }
  return base ** exponent;
}

function squareRoot(n) {
  if (!Number.isFinite(n)) {
    throw new Error("Operand must be a valid number.");
  }
  if (n < 0) {
    throw new Error("Cannot calculate the square root of a negative number.");
  }
  return Math.sqrt(n);
}

function parseArguments(args) {
  const operation = args[1];
  const isSquareRoot =
    operation === "sqrt" ||
    operation === "squareRoot" ||
    operation === "square-root";

  if ((isSquareRoot && args.length !== 2) || (!isSquareRoot && args.length !== 3)) {
    throw new Error(
      "Usage: node src/calculator.js <number> <operation> [number]"
    );
  }

  const [firstValue, , secondValue] = args;
  const firstOperand = Number(firstValue);
  const secondOperand = secondValue === undefined ? undefined : Number(secondValue);

  return { firstOperand, operation, secondOperand };
}

if (require.main === module) {
  try {
    const { firstOperand, operation, secondOperand } = parseArguments(
      process.argv.slice(2)
    );
    console.log(calculate(firstOperand, operation, secondOperand));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { calculate, modulo, power, squareRoot, parseArguments };
