const display = document.querySelector('.display');
const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operator'));
const equalSign = document.querySelector('.equalSign');
const clearButton = document.querySelector('.clear');
let displayValue = null;
let firstNum = null;
let secondNum = null;
let operation = null;
let calculation = null;

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        display.textContent += e.target.textContent;
        displayValue = +display.textContent;
        console.log(displayValue);
    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        firstNum = displayValue;
        operation = e.target.textContent;
        display.textContent = null;
    });
});

equalSign.addEventListener('click', (e) => {
    secondNum = +display.textContent

    if (operation === '/') {
        calculation = divide;
    } else if (operation === '*') {
        calculation = multiply;
    } else if (operation === '-') {
        calculation = subtract;
    } else if (operation === '+') {
        calculation = add;
    }

    display.textContent = operate(calculation, firstNum, secondNum)

});

clearButton.addEventListener('click', () => {
    displayValue = null;
    firstNum = null;
    secondNum = null;
    operation = null;
    calculation = null;
    display.textContent = null;
});

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
} 

function multiply(a , b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    return operator(a, b)
}

console.log(divide);