export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;
export const divide = (a, b) => {
  if (b === 0) throw new Error("Can't divide by zero");
  return a / b;
};

export default function calculate(operations) {
  return operations.map(op => {
    const { type, x, y } = op;
    switch (type) {
      case 'add': return add(x, y);
      case 'subtract': return subtract(x, y);
      case 'multiply': return multiply(x, y);
      case 'divide': return divide(x, y);
      default: throw new Error(`Unknown operation: ${type}`);
    }
  });
}
