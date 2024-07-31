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

function operate() {
    const operators = '+-*/';
    let expression = prompt('Enter the expression');
    let operator = findOperator(expression.split(''), operators);
    
    let result = expression
    .split(operator)
    .map(convertToFloat)
    .reduce((result, currentItem) => {
        switch (operator) {
            case '+':
                return add(result, currentItem);
            case '-':
                return subtract(result, currentItem);
            case '*':
                return multiply(result, currentItem);
            case '/':
                return divide(result, currentItem);
        }
    })
    console.log(result);
}

operate();