#!/usr/bin/env node

/**
 * Calculate a result using one of the four supported basic operations:
 * addition (+), subtraction (-), multiplication (*), and division (/).
 */
function calculate(firstOperand, operator, secondOperand) {
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
    default:
      throw new Error(
        "Unsupported operation. Use add, subtract, multiply, or divide."
      );
  }
}

function parseArguments(args) {
  if (args.length !== 3) {
    throw new Error(
      "Usage: node src/calculator.js <number> <operation> <number>"
    );
  }

  const [firstValue, operation, secondValue] = args;
  const firstOperand = Number(firstValue);
  const secondOperand = Number(secondValue);

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

module.exports = { calculate, parseArguments };
