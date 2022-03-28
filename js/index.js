const display = document.querySelector('.display');
const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operator'));
const equalSign = document.querySelector('.equalSign');
const clearButton = document.querySelector('.clear');
let displayValue = null;
let operation = null;
let firstNum = null;
let secondNum = null;
let calculation = null;
let displayChecker = 'on';
let equalChecker = 'on'

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        if (displayChecker === 'off') {
            display.textContent = null;
            displayChecker = 'on';
        }
        display.textContent += e.target.textContent;
        displayValue = +display.textContent;
    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        displayChecker = 'off';
        if (firstNum) {
            if (equalChecker === 'on') {
                secondNum = displayValue;
            checkCalc();
            display.textContent = operate(calculation, firstNum, secondNum);
            firstNum = +display.textContent;
            secondNum = null;
            } else {
                equalChecker = 'on';        
            }           
        } else {
            firstNum = displayValue;
        }
        operation = e.target.textContent;
        
    });
});

equalSign.addEventListener('click', (e) => {
    secondNum = displayValue;
    checkCalc();
    display.textContent = operate(calculation, firstNum, secondNum);
    firstNum = +display.textContent;
    secondNum = null;
    equalChecker = 'off';
});

clearButton.addEventListener('click', () => {
    displayValue = null;
    operation = null;
    firstNum = null;
    secondNum = null;
    calculation = null;
    displayChecker = 'on';
    display.textContent = null;
    equalChecker = 'on';
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

function checkCalc() {
    if (operation === '/') {
        calculation = divide;
    } else if (operation === '*') {
        calculation = multiply;
    } else if (operation === '-') {
        calculation = subtract;
    } else if (operation === '+') {
        calculation = add;
    }
}