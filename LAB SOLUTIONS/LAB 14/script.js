// Get result element
const resultDisplay = document.getElementById("result");

// Functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error: Cannot divide by zero";
  }
  return a / b;
}

// Main calculator function
function calculate(operation) {
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);

  // Handle empty inputs
  if (isNaN(num1) || isNaN(num2)) {
    resultDisplay.textContent = "Error: Please enter valid numbers";
    return;
  }

  let result;

  switch (operation) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "*":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
    default:
      result = "Error: Invalid operation";
  }

  resultDisplay.textContent = "Result: " + result;
}

// Clear function
function clearCalculator() {
  document.getElementById("num1").value = "";
  document.getElementById("num2").value = "";
  resultDisplay.textContent = "Result: ";
}