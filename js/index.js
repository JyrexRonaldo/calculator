const body = document.querySelector("body");
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
        result =  String(parseFloat(result.toFixed(3)));  
        console.log(typeof result)
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
    operator.addEventListener("click", operatorHandler);
});

function operatorHandler(e) {
        if (secondNumber !== null) {
            display.textContent = "";
            updateDisplay(operate(symbol, firstNumber, secondNumber));
            firstNumber = secondNumber;
            deleteCode = 1;
            secondNumber = null;
        }
        operatorCode  = 1;
        numberCode  = 1
        if (e.type === "click") {
            symbol = e.target.textContent;
        } else if (e.type === "keydown") {
            symbol = e.key;
        }
}
    
numbers.forEach((number) => {
    number.addEventListener("click", inputDisplay);
});

function inputDisplay(e) {
    if (e.type == "click") {
        updateDisplay(e.target.textContent);    
    } else if (e.type == "keydown") {
        let pressedKey = e.code.slice(6, e.code.length) 
        switch (pressedKey) {
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case "0":
                updateDisplay(pressedKey);
                break;
            case "Decimal":
                if (display.textContent.includes(".")) {
                updateDisplay("")                        
                } else if (!(display.textContent.includes("."))) {
                updateDisplay(".");    
                }                   
                break;
        }
    }
    checkDisplayDot()    
}

equalSign.addEventListener("click", equalSignHandler);

function equalSignHandler() {
    display.textContent = "";
    updateDisplay(operate(symbol, firstNumber, secondNumber));
    firstNumber = secondNumber;
    secondNumber = null;
    checkDisplayDot()
    deleteCode = 1;
}

clearbutton.addEventListener("click", clearbuttonHandler)

function clearbuttonHandler() {
    operatorCode = 0;
    numberCode = 0;
    symbol = null;
    firstNumber = null;
    secondNumber = null;
    operator = null;
    display.textContent = null;
    deleteCode = 0;
}


function checkDisplayDot() {
    if (display.textContent.includes(".")) {
        dot.removeEventListener("click", inputDisplay)
    } else if (!(display.textContent.includes("."))){
        dot.addEventListener("click", inputDisplay)
    }
}

deleteButton.addEventListener("click", deleteButtonHandler);

function deleteButtonHandler() {
    let displayText = display.textContent;
    displayText = displayText.slice(0, displayText.length - 1);
    display.textContent = displayText;
    if (deleteCode === 2) {
        secondNumber = display.textContent;    
    } else if (deleteCode === 1){
        
        firstNumber = display.textContent;
    }
}


body.addEventListener("keydown", (e) => {

    switch (e.code) {
            case "Numpad1":
            case "Numpad2":
            case "Numpad3":
            case "Numpad4":
            case "Numpad5":
            case "Numpad6":
            case "Numpad7":
            case "Numpad8":
            case "Numpad9":
            case "Numpad0":
            case "NumpadDecimal":
                inputDisplay(e);
                break;
            case "NumpadAdd":
            case "NumpadSubtract":
            case "NumpadDivide":
            case "NumpadMultiply":
                operatorHandler(e);
                break;
            case "Equal":
            case "NumpadEnter":
                equalSignHandler();
                break;  
            case "Delete":
                clearbuttonHandler();
                break;
            case "Backspace":
                deleteButtonHandler();
                break;
    }
});