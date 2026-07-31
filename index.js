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
    if (operator === "/" && list.includes(number => number === 0) === 0) {
        throw new Error("You cannot divide by 0")
    }
    let result = list.reduce(operation);
    DisplayOperator.textContent = '';
    secondDisplayNumber.textContent = '';
    currentDisplayNumber.textContent = result;
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
const backspaceBtn = document.getElementById('backspace');
const currentDisplayNumber =
    document.getElementById("current-display-number");

const removeActiveOperator = () => {
    operators.forEach((button) => {
        button.classList.remove("active");
    });
};

numbers.forEach((button) => {
    button.addEventListener("click", (e) => {
        const value = e.target.dataset.value;
        if (isAfterOperate) {
            clear(true);
            isAfterOperate = false;
        }
        if (dispOperator !== null) {
            if (value === "." && num2.includes(".")) {
                return;
            }
            num2 = num2.concat(value);
            secondDisplayNumber.textContent = num2;

        } else {
            if (value === "." && num1.includes(".")) {
                return;
            }
            num1 = num1.concat(value);
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

        removeActiveOperator();
        e.currentTarget.classList.add("active");

        DisplayOperator.textContent = e.target.dataset.value;
        dispOperator = e.target.dataset.value;
    })
})

operateBtn.addEventListener('click', (e) => {
    if (num1 !== '' && num2 !== '' && dispOperator !== null) {
        operate(dispOperator, [Number(num1), Number(num2)])
        removeActiveOperator();
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
    currentDisplayNumber.textContent = '0';

    removeActiveOperator();
}

backspaceBtn.addEventListener('click', (e) => {
    if (num2 !== '') {
        num2 = num2.slice(0, -1);
        secondDisplayNumber.textContent = num2;
        console.log(num2);
    } else if (num1 !== '' && dispOperator === null) {
        num1 = num1.slice(0, -1);
        firstDisplayNumber.textContent = num1;
    }
})

document.addEventListener("keydown", (event) => {
    const isCalculatorKey = /^[0-9+\-*/().=%]$/.test(event.key);
    const isControlKey = [
        "Backspace",
        "Delete",
        "Enter",
        "Escape",
        "Tab",
        "ArrowLeft",
        "ArrowRight"
    ].includes(event.key);

    if (isCalculatorKey || isControlKey) {
        let key = event.key;
        if (event.key === "=") key = "Enter";
        const button = document.querySelector(`button[data-value="${key}"]`)
        if (button) {
            button.click();
        }
    } else {
        event.preventDefault();
    }
});


const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    const isLightTheme = document.body.classList.contains("light-theme");

    if (isLightTheme) {
        themeToggle.setAttribute("aria-label", "Switch to dark theme");
    } else {
        themeToggle.setAttribute("aria-label", "Switch to light theme");
    }
});

const splashScreen =
    document.getElementById("splash-screen");

window.addEventListener("load", () => {
    setTimeout(() => {
        splashScreen.classList.add("hidden");
    }, 1800);
});