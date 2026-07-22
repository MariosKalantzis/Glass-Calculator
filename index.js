const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b
};
let isAfterOperate = false;
let num1 = "";
let num2 = "";
let dispOperator = null;

const operate = (operator, list) => {
    const operation = operations[operator]
    if (!operation) {
        throw new Error("Unsupported operator");
    }
    if (operator === "/" && list.find(number => number === 0) === 0) {
        throw new Error("You cannot divide by 0 fucking idiot")
    }
    let result = list.reduce(operation);
    DisplayOperator.textContent = '';
    secondDisplayNumber.textContent = '';
    firstDisplayNumber.textContent = result;
    dispOperator = null;
    num2 = "";
    num1 = result.toString();
    console.log(isAfterOperate)
    isAfterOperate = true;
}

const container = document.querySelector('.container');
const display = document.getElementById("display");
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operators');
const operateBtn = document.getElementById('operate');
const clearButton = document.getElementById('clear');
const firstDisplayNumber = document.getElementById('first-display-number');
const DisplayOperator = document.getElementById('display-operator');
const secondDisplayNumber = document.getElementById('second-display-number');

numbers.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (isAfterOperate) {
            clear(true);
            isAfterOperate = false;
            // num1 = e.target.dataset.value;
            // console.log(isAfterOperate);
        }
        if (dispOperator !== null) {
            num2 = num2.concat(e.target.dataset.value);
            secondDisplayNumber.textContent = num2;
        } else {
            num1 = num1.concat(e.target.dataset.value);
            firstDisplayNumber.textContent = num1;
        }
    })
});

operators.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (num1 !== '' && num2 !== '' && dispOperator !== null) {
            operate(dispOperator, [Number(num1), Number(num2)])
            return
        }
        DisplayOperator.textContent = e.target.dataset.value;
        dispOperator = e.target.dataset.value;
    })
})

operateBtn.addEventListener('click', (e) => {
    if (num1 !== '' && num2 !== '' && dispOperator !== null) {
        operate(dispOperator, [Number(num1), Number(num2)])
    }
})

clearButton.addEventListener('click', () => {
    clear(true);
})

const clear = (shouldClearNum1 = false) => {
    if (shouldClearNum1) num1 = '';
    num2 = '';
    dispOperator = null;
    DisplayOperator.textContent = '';
    secondDisplayNumber.textContent = '';
    firstDisplayNumber.textContent = '';
}