let trailingResult = 0;
let operationOptions = ['add', 'subtract', 'multiply', 'divide'];
let workingOperation = ''

function updateDisplay(input) {
    let display = document.getElementById("display");
    console.log(input);

    // currentInput === -1 meaning the input value is a number
    // currentInput >= 0 meaning the input value is an operation 

    // when the first input is a number
    if (display.innerHTML === "0" && operationOptions.indexOf(input) === -1) {
        if (input === "decimal") {
            display.innerHTML = "0.";
        } else if (input === "negative-value") {
            if (display.innerHTML.indexOf("-1") === -1) { 
                display.innerHTML = "-" + display.innerHTML;
            } else if (display.innerHTML.indexOf("-1") > -1) {
                display.innerHTML = display.innerHTML.slice(1, display.innerHTML.length);
            }
        }
        else {
            display.innerHTML = input; // the input number is displayed 
        }
    }
    
    // when the input is an operand
    else if (operationOptions.indexOf(input) >= 0) {
        // Dealing without an operand
        if (workingOperation === "") {
            workingOperation = input;
            trailingResult = display.innerHTML; // the input is assigned to the trailing Result
            display.innerHTML = 0; // the display is set back to default 0 
        } 
        // Dealing with a set operand 
        else {
            trailingResult = calculation(trailingResult, display.innerHTML, workingOperation);  // the calculation outcome become the new trailing result
            display.innerHTML = 0;
            workingOperation = input
        }
    }

    // When equal sign is entered:
    else if (input === "equals") {
        // the newly entered number is added to the previous trailing result, getting a sum
        display.innerHTML = calculation(trailingResult, display.innerHTML, workingOperation); 
        trailingResult = display.innerHTML; // the sum becomes the new trailing result
        workingOperation = "";
    }

    else if (input === "negative-value") {
        // when there's no existing negative sign on display 
        if (display.innerHTML.indexOf("-1") === -1) { 
            display.innerHTML = "-" + display.innerHTML;
        // if a negatic sign already exist on display, remove the first negative sign on display so it only shows one 
        } else if (display.innerHTML.indexOf("-1") > -1) {
            display.innerHTML = display.innerHTML.slice(1, display.innerHTML.length);
        }
    }

    else {
        // check if the input is a decimal and if the display already contains a decimal 
        if (input === "." && display.innerHTML.includes(".")) {
            // do nothing
        } else {
            display.innerHTML += input; // input a number with over 1 digit
        }
    }

    console.log('trailingResult:', trailingResult, ', display.innerHTML:', display.innerHTML, ', working operation:', workingOperation)
}

// Pressing the clear button should reset the display to 0
function clearDisplay() {
    let display = document.getElementById("display");
    display.innerHTML = 0;
}

function calculation(firstNum, secondNum, operation) {
    let result;
    firstNum = parseFloat(firstNum);
    secondNum = parseFloat(secondNum);
    switch(operation) {
        case "add":
            result = firstNum + secondNum;
            break;
        case "subtract":
            result = firstNum - secondNum;
            break;
        case "multiply":
            result = firstNum * secondNum;
            break;
        case "divide":
            result = firstNum / secondNum;
            break;
    }
    return result.toString();   
}