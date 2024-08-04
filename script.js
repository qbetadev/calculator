const numberButtons = document.querySelectorAll('.button_number');
const operatorButtons = document.querySelectorAll('.button_operate');
const signButton = document.querySelector('.button_sign');
const clearButton = document.querySelector('.button_clear');
const deleteButton = document.querySelector('.button_delete');
const pointButton = document.querySelector('.button_point');
const equalButton = document.querySelector('.button_equal');
const currentOperationDisplay = document.querySelector('.display_current-operation');
const currentNumberDisplay = document.querySelector('.display_current-number');

let operandFirst = '';
let operandSecond = '';
let currentOperator = '';

let shouldResetCurrentNumber = false;

numberButtons.forEach((button) => {
    button.addEventListener('click', () => appendNumber(button.textContent));
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => setCurrentOperation(button.textContent));
});

window.addEventListener('keydown', (e) => handleKeyboardInput(e));

clearButton.addEventListener('click', () => clearDisplay());

deleteButton.addEventListener('click', () => deleteNumber());

pointButton.addEventListener('click', () => appendPoint());

equalButton.addEventListener('click', () => evaluate());

signButton.addEventListener('click', () => changeSign());

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') appendPoint();
    if (e.key === 'Enter' || e.key === '=') evaluate();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clearDisplay();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key ==='/') setCurrentOperation(e.key);
}

function appendNumber(string) {
    if (currentNumberDisplay.textContent == 0 || shouldResetCurrentNumber) {
        resetDisplay();
        shouldResetCurrentNumber = false;
        currentNumberDisplay.textContent += string;
    } else {
        currentNumberDisplay.textContent += string;
    }
}

function appendPoint() {
    if (currentNumberDisplay.textContent.includes('.')) return;
    currentNumberDisplay.textContent += '.';
}

function changeSign() {
    if (currentNumberDisplay.textContent.includes('-')) {
        currentNumberDisplay.textContent = currentNumberDisplay.textContent.slice(1);
    } else {
        currentNumberDisplay.textContent = '-' + currentNumberDisplay.textContent;
    }
}

function clearDisplay() {
    currentNumberDisplay.textContent = 0;
    currentOperationDisplay.textContent = '';
}

function resetDisplay() {
    currentNumberDisplay.textContent = '';
}

function deleteNumber() {
    if (!shouldResetCurrentNumber) {
        currentNumberDisplay.textContent = currentNumberDisplay.textContent
        .toString()
        .slice(0, -1);
    }
    if (currentNumberDisplay.textContent == '') {
        currentNumberDisplay.textContent = '0';
    }
}

function setCurrentOperation(operator) {
    if (currentOperator !== '') evaluate()
    operandFirst = currentNumberDisplay.textContent;
    currentOperator = operator;
    currentOperationDisplay.textContent = `${operandFirst} ${currentOperator}`;
    shouldResetCurrentNumber = true;
}

function evaluate() {
    if (currentOperator == '' || shouldResetCurrentNumber) return;
    if (currentOperator == '/' && currentNumberDisplay.textContent == '0') {
        alert('You can\'t divide by zero!');
        return;
    };
    operandSecond = currentNumberDisplay.textContent;
    currentOperationDisplay.textContent = `${operandFirst} ${currentOperator} ${operandSecond} =`;
    currentNumberDisplay.textContent = operate(operandFirst, operandSecond, currentOperator);
    // currentNumberDisplay.textContent = roundResult(operate(operandFirst, operandSecond, currentOperator));
    currentOperator = '';
    shouldResetCurrentNumber = true;
}

function add(number1, number2) {
    return number1 + number2;
}

function subtract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(number1, number2) {   
    return number1 / number2;
}

function findOperator(array, operators) {
    return array.filter((element) => operators.includes(element))[0];
}

function convertToFloat(string) {
    return parseFloat(string);
}

// function roundResult(number) {
//     return Math.round(number * 1000) / 1000;
// }

function operate(operandFirst, operandSecond, currentOperator) {
    operandFirst = parseFloat(operandFirst);
    operandSecond = parseFloat(operandSecond);
    switch(currentOperator) {
        case '+':
            return add(operandFirst, operandSecond);
        case '-':
            return subtract(operandFirst, operandSecond);
        case '*':
            return multiply(operandFirst, operandSecond);
        case '/':
            return divide(operandFirst, operandSecond);
    }
}