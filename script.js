const page = document.querySelector('html')
const switchToggle = document.querySelector('#switch-shadow')
const display = document.querySelector('.display__input');
const buttonsNumbers = document.querySelectorAll('.button-number');
const buttonClear = document.querySelector('.button-clear');
const buttonsOperators = document.querySelectorAll('.button-operator');
const buttonEqual = document.querySelector('.button-equal');

switchToggle.addEventListener('change', () => {
  page.classList.toggle('dark-mode')
})

function clearDisplay() {
  display.value = 0;
}

function handleClickNumber() {
  if (display.value !== "0") {
    display.value += this.value;
  } else {
    display.value = this.value;
  }
}

function handleClickOperation() {
  removeLastItemIfIsAnOperator();
  display.value += this.value;
}

function removeLastItemIfIsAnOperator() {
  if (isLastItemAnOperator())
    display.value = display.value.slice(0, -1);
}

function isLastItemAnOperator() {
  const operations = ['+', '-', 'x', '÷'];
  let lastItem = display.value.split('').pop();

  return operations.some(item => {
    return item === lastItem;
  });
}

function handleClickEqual() {
  removeLastItemIfIsAnOperator();
  let allValues = display.value.match(/(?:\d+)|[+x÷-]/g);
  let result = parseInt(allValues[0]);
  let i = 1;
  let valueIn, operator;
  while (i < allValues.length) {
    operator = allValues[i];
    valueIn = parseInt(allValues[i + 1]);
    result = calculator(result, valueIn, operator);
    i += 2;
  }
  display.value = result;
}

function calculator(value1, value2, operator) {
  switch (operator) {
    case '+':
      return value1 + value2;
    case '-':
      return value1 - value2;
    case 'x':
      return value1 * value2;
    case '÷':
      return value1 / value2;
  }
}

clearDisplay();

buttonsNumbers.forEach(button => {
  button.addEventListener('click', handleClickNumber, false);
});

buttonsOperators.forEach(button => {
  button.addEventListener('click', handleClickOperation, false);
});

buttonClear.addEventListener('click', clearDisplay, false);

buttonEqual.addEventListener('click', handleClickEqual, false);
