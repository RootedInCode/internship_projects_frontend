const display = document.getElementById('display');
const calc = document.getElementById('calculator');

function appendToDisplay(value) {
  display.value += value;
}

function appendOperator(operator) {
  if (display.value && !isOperatorAtEnd()) {
      display.value += operator;
    }
}

function isOperatorAtEnd() {
  return ['+', '-', '*', '/'].includes(display.value.slice(-1));
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  if (!display.value || isOperatorAtEnd()) {
    return; // Do nothing if the display is empty or ends with an operator
  }
  try {
    display.value = eval(display.value);
  }
  catch (error) {
    display.value = "Error";
    disableInputs(true);
    setTimeout(() => {
      clearDisplay();
      disableInputs(false);
    }, 1000);
  }
}

function disableInputs(state) {
  const buttons = document.querySelectorAll("button");
  buttons.forEach(button => {
    button.disabled = state;
  });

  if (state) {
    document.addEventListener("keydown", preventKeyPress); // Block keyboard
  } else {
    document.removeEventListener("keydown", preventKeyPress); // Allow keyboard
  }
}

function preventKeyPress(event) {
  event.preventDefault();
}

document.addEventListener("keydown", event => {
  const key = event.key;

  if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
    appendToDisplay(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (key === 'Escape') {
    clearDisplay();
  }
});
