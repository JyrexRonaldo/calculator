const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equalSign = document.querySelector(".calculate");
const clearbutton = document.querySelector(".clear");
const display = document.querySelector(".display");
const dot = document.querySelector(".dot")
const deleteButton = document.querySelector(".delete");
let deleteCode = 0;
let operatorCode = 0;
let numberCode = 0;
let firstNumber = null;
let secondNumber = null;
let symbol = null;

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
    return a / b;
}

function operate(symbol, a, b) {
        a = +a;
        b = +b;    
    let result = 0;
    
    switch (symbol) {
        case "+":
            result = add(a ,b);
            break;
        case "-":
            result = subtract(a ,b)
            break;
        case "*":
            result = multiply(a ,b)
            break;
        case "/":
            result = divide(a ,b)
            break;
    }

    if (result % Math.floor(result) !== 0) {
        result =  result.toFixed(3);    
    }

    if (result === Infinity) {
        result = "Yeah let's not divide by 0"
    }   
    return result;
}

function updateDisplay(value = "") {
    if (operatorCode === 1) {
        display.textContent = "";
        operatorCode = 0;
    }
    display.textContent += value;
    if (numberCode === 1) {
        secondNumber = display.textContent;
        deleteCode = 2;    
    } else if (numberCode === 0){
        firstNumber = display.textContent;
        deleteCode = 1;
    }
}

operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        if (secondNumber !== null) {
            display.textContent = "";
            updateDisplay(operate(symbol, firstNumber, secondNumber));
            firstNumber = secondNumber;
            deleteCode = 1;
            secondNumber = null;
        }
        operatorCode  = 1;
        numberCode  = 1
        symbol = e.target.textContent;
    });
});
    
numbers.forEach((number) => {
    number.addEventListener("click", inputDisplay);
});

function inputDisplay(e) {
    updateDisplay(e.target.textContent);
    checkDisplayDot()    
}

equalSign.addEventListener("click", (e) => {
    display.textContent = "";
    updateDisplay(operate(symbol, firstNumber, secondNumber));
    firstNumber = secondNumber;
    secondNumber = null;
    checkDisplayDot()
    deleteCode = 1;
});

clearbutton.addEventListener("click", (e) => {
    operatorCode = 0;
    numberCode = 0;
    symbol = null;
    firstNumber = null;
    secondNumber = null;
    operator = null;
    display.textContent = null;
    deleteCode = 0;
})


function checkDisplayDot() {
    if (display.textContent.includes(".")) {
        dot.removeEventListener("click", inputDisplay)
    } else if (!(display.textContent.includes("."))){
        dot.addEventListener("click", inputDisplay)
    }
}

deleteButton.addEventListener("click", (e) => {
    let displayText = display.textContent;
    displayText = displayText.slice(0, displayText.length - 1);
    display.textContent = displayText;
    if (deleteCode === 2) {
        secondNumber = display.textContent;    
    } else if (deleteCode === 1){
        
        firstNumber = display.textContent;
    }
});