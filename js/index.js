const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equalSign = document.querySelector(".calculate");
const clearbutton = document.querySelector(".clear");
const display = document.querySelector(".display");
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
    
    return result 
}

function updateDisplay(value = "") {
    if (operatorCode === 1) {
        display.textContent = "";
        operatorCode = 0;
    }
    display.textContent += value;
    if (numberCode === 1) {
        // display.textContent += value;
        secondNumber = display.textContent;    
    } else if (numberCode === 0){
        // display.textContent += value;
        firstNumber = display.textContent;
    }
}

operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        operatorCode  = 1;
        numberCode  = 1
        symbol = e.target.textContent;
        
        // console.log(operator);     
    });
});
    
numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        updateDisplay(e.target.textContent);
        // return e.target.textContent;
    });
});


equalSign.addEventListener("click", (e) => {
    console.log(symbol)
    display.textContent = ""
    updateDisplay(operate(symbol, firstNumber, secondNumber));
});

clearbutton.addEventListener("click", (e) => {
    firstNumber = null;
    secondNumber = null;
    operator = null;
    display.textContent = null;
})


// }

// function calculatorLogic() {

// }