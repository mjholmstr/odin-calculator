let currentNumber = "";
let previousNumber = "";
let operator = "";

const currentDisplayNumber = document.querySelector(".currentNumber");
const previousDisplayNumber = document.querySelector(".previousNumber");

window.addEventListener("keypress", handleKeypress);

const equals = document.querySelector(".equal");
equals.addEventListener("click", () => {
    if (currentNumber !== "" && previousNumber !== "") {
        calculate();
    }
});

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", () => {
    addDecimal();
})

const clear = document.querySelector(".clear");
clear.addEventListener("click", clearCalculator);

const numberButton = document.querySelectorAll(".number");
const operatorButton = document.querySelectorAll(".operator");

numberButton.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        handleNumber(e.target.textContent);
    });
});

function handleNumber(number) {
    if(previousNumber !== "" && currentNumber !== "" && operator !== "") {
        previousNumber = "";
        currentDisplayNumber.textContent = currentNumber;
    }
    if (currentNumber.length <= 10) {
        currentNumber += number;
        currentDisplayNumber.textContent = currentNumber;
    }
}   

operatorButton.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        handleOperator(e.target.textContent);
    });
});

function handleOperator(op) {
    if (previousNumber === "") {
        previousNumber = currentNumber;
        operatorCheck(op);
    } else if (currentNumber == "") {
        operatorCheck(op);
    } else {
        calculate();
        operator = op;
        currentDisplayNumber.textContent = "0";
        previousDisplayNumber.textContent = previousNumber + " " + operator;
    }
}

function operatorCheck(text) {
    operator = text;
    previousDisplayNumber.textContent = previousNumber + " " + operator;
    currentDisplayNumber.textContent = "0";
    currentNumber = "";
}

function calculate() {
    previousNumber = Number(previousNumber);
    currentNumber = Number(currentNumber);

    if (operator === "+") {
        previousNumber = previousNumber + currentNumber;
    } else if (operator === "-") {
        previousNumber = previousNumber - currentNumber;
    } else if (operator === "x") {
        previousNumber = previousNumber * currentNumber;
    } else if (operator === "/") {
        if (currentNumber == 0) {
            previousNumber = "Error";
            displayResult();
            return;
        }
        previousNumber = previousNumber / currentNumber;
    }
    previousNumber = previousNumber.toString();
    displayResult();
}

function displayResult() {
    previousDisplayNumber.textContent = "";
    

    if (previousNumber.length <= 12) {
        currentDisplayNumber.textContent = previousNumber;
    } else {
        currentDisplayNumber.textContent = previousNumber.slice(0,12);
    };

    currentNumber = "";
    operator = "";
};

function clearCalculator() {
    currentNumber = "";
    previousNumber = "";
    operator = "";
    currentDisplayNumber.textContent = "0";
    previousDisplayNumber.textContent = "";
}

function addDecimal() {
    if (!currentNumber.includes(".")) {
        currentNumber += ".";
        currentDisplayNumber.textContent = currentNumber;
    }
}

function handleKeypress(e) {
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9) {
        handleNumber(e.key);
    }
    if (e.key === "Enter" || (e.key === "=" && currentNumber != "" && previousNumber !=="")) {
        calculate();
    }
    if (e.key === "+" || e.key === "-" || e.key === "/") {
        handleOperator(e.key);
    }
    if (e.key === "*") {
        handleOperator("x");
    }
    if (e.key === ".") {
        addDecimal();
    }
    if (e.key === "Backspace") {
        handleDelete();
    }
}

function handleDelete() {
    if (currentNumber !== "") {
        currentNumber = currentNumber.slice(0, -1);
        currentDisplayNumber.textContent = currentNumber;
        if (currentNumber === "") {
            currentDisplayNumber.textContent = "0";
        }
    }
    if ( currentNumber === "" && previousNumber !== "" && operator === "") {
        previousNumber = previousNumber.slice(0, -1);
        currentDisplayNumber.textContent = previousNumber;
    }
}



