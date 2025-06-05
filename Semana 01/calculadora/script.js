const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let operator = '';
let firstValue = '';
let shouldReset = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === '=') {
      if (firstValue && operator && currentInput) {
        display.textContent = calculate(firstValue, currentInput, operator);
        currentInput = display.textContent;
        firstValue = '';
        operator = '';
        shouldReset = true;
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (currentInput) {
        firstValue = currentInput;
        operator = value;
        shouldReset = true;
      }
    } else {
      if (shouldReset) {
        currentInput = '';
        shouldReset = false;
      }
      currentInput += value;
      display.textContent = currentInput;
    }
  });
});

function calculate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : 'Erro';
    default: return b;
  }
}
