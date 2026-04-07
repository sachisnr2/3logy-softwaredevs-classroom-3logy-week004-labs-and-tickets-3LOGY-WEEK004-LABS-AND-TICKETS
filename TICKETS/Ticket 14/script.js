const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const resultDiv = document.getElementById('result');
const historyDiv = document.getElementById('history');

let history = [];

// Basic operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;

const divide = (a, b) => {
  if (b === 0) return "Error: Cannot divide by zero";
  return a / b;
};

// New operations
const power = (a, b) => Math.pow(a, b);

const modulus = (a, b) => {
  if (b === 0) return "Error: Cannot divide by zero";
  return a % b;
};

const squareRoot = (a) => {
  if (a < 0) return "Error: Invalid square root";
  return Math.sqrt(a);
};

const percentage = (a, b) => (a * b) / 100;

// History
const updateHistory = (text) => {
  history.push(text);
  history = history.slice(-5);

  historyDiv.innerHTML = history.map(item => `<p>${item}</p>`).join('');
};

const clearHistory = () => {
  history = [];
  historyDiv.innerHTML = "";
};

// Main function
function calculate(op) {
  const a = Number(num1Input.value);
  const b = Number(num2Input.value);

  if (op !== 'sqrt' && (isNaN(a) || isNaN(b))) {
    resultDiv.textContent = "Enter valid numbers";
    return;
  }

  if (op === 'sqrt' && isNaN(a)) {
    resultDiv.textContent = "Enter a valid number";
    return;
  }

  let result, text;

  switch(op) {
    case 'add':
      result = add(a, b);
      text = `${a} + ${b} = ${result}`;
      break;

    case 'subtract':
      result = subtract(a, b);
      text = `${a} - ${b} = ${result}`;
      break;

    case 'multiply':
      result = multiply(a, b);
      text = `${a} × ${b} = ${result}`;
      break;

    case 'divide':
      result = divide(a, b);
      if (typeof result === "string") return resultDiv.textContent = result;
      text = `${a} ÷ ${b} = ${result}`;
      break;

    case 'power':
      result = power(a, b);
      text = `${a} ^ ${b} = ${result}`;
      break;

    case 'modulus':
      result = modulus(a, b);
      if (typeof result === "string") return resultDiv.textContent = result;
      text = `${a} % ${b} = ${result}`;
      break;

    case 'sqrt':
      result = squareRoot(a);
      if (typeof result === "string") return resultDiv.textContent = result;
      text = `√${a} = ${result}`;
      break;

    case 'percentage':
      result = percentage(a, b);
      text = `${b}% of ${a} = ${result}`;
      break;
  }

  resultDiv.textContent = `Result: ${result}`;
  updateHistory(text);
}

// Clear
function clearCalculator() {
  num1Input.value = "";
  num2Input.value = "";
  resultDiv.textContent = "Result will appear here";
}