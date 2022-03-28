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
let checker = 'on';

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        if (checker === 'off') {
            display.textContent = null;
            checker = 'on';
        }
        display.textContent += e.target.textContent;
        displayValue = +display.textContent;
    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        checker = 'off';
        if (firstNum) {
            secondNum = displayValue;
            console.log(`Second num: ${secondNum}`);
            if (operation === '/') {
                calculation = divide;
            } else if (operation === '*') {
                calculation = multiply;
            } else if (operation === '-') {
                calculation = subtract;
            } else if (operation === '+') {
                calculation = add;
            }

            display.textContent = operate(calculation, firstNum, secondNum);
            firstNum = +display.textContent;
            secondNum = null;
        } else {
            firstNum = displayValue;
            console.log(`First num: ${firstNum}`);
        }
        operation = e.target.textContent;
        
    });
});

equalSign.addEventListener('click', (e) => {
    
});

clearButton.addEventListener('click', () => {
    displayValue = null;
    operation = null;
    firstNum = null;
    secondNum = null;
    calculation = null;
    checker = 'on';
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

/*
!ST NUMBER 
Press number 
present number
store the number for use in first number container


Press operation 
Store operation value for use

2ND NUMBER
press number again
check if first number container is true/full
if so clear diplay
present number 
store the number in second number container



options available = 2:
press equal sign
check operation
evaluate operation and present it
OR
PRESS OPERATION AGAIN
press new operation 
evaluates old operation and present it
store result in first number container
empty second number container
*/


// if (secondNum) {
//     if (operation === '/') {
//         calculation = divide;
//     } else if (operation === '*') {
//         calculation = multiply;
//     } else if (operation === '-') {
//         calculation = subtract;
//     } else if (operation === '+') {
//         calculation = add;
//     }
// }