"use strict";

const operandBackgroundColor = "#c0091e";
const operandColor = "#f3f3eb";
const operandButtons = document.querySelectorAll(".button-operand");

let numbers = [];
let currentNumber = "";
let output = "";

let decimal = false;
let operand = "";

const buttons = document.querySelectorAll(".button");
const screen = document.querySelector(".screen");

function evalNumbers(lastNumber, currentNumber, operator) {
  if (operator === "/") return Number(lastNumber) / Number(currentNumber);
  if (operator === "*") return Number(lastNumber) * Number(currentNumber);
  if (operator === "-") return Number(lastNumber) - Number(currentNumber);
  if (operator === "+") return Number(lastNumber) + Number(currentNumber);
  if (operator === "%")
    return (Number(lastNumber) / Number(currentNumber)) * 100;
}

function clearCalculator(magnitude) {
  if (magnitude === "clearScreen") {
    currentNumber = "";
    decimal = false;
    screen.textContent = 0;
  }
  if (magnitude === "resetAll") {
    decimal = false;
    numbers = [];
    currentNumber = "";
    operand = "";
    screen.textContent = "0";
  }
}

function resetOperandButtons() {
  operandButtons.forEach((button) => {
    button.style.backgroundColor = operandBackgroundColor;
    button.style.color = operandColor;
  });
}

function setCurrentOperandButton(currButton, inputValue) {
  currButton.style.backgroundColor = operandColor;
  currButton.style.color = operandBackgroundColor;
  operand = inputValue;
}

function runCalculatorOperations(event) {
  const currButton = event.target;
  const currButtonClasses = currButton.classList;
  const inputValue = currButton.dataset.input;
  if (
    currButtonClasses.contains("button-number") &&
    currentNumber.length < 10
  ) {
    if (operand) {
      resetOperandButtons();
    }
    currentNumber += inputValue;
    screen.textContent = currentNumber;
  }
  if (
    currButtonClasses.contains("button-decimal") &&
    currentNumber.length < 9 &&
    !decimal
  ) {
    if (operand) {
      resetOperandButtons();
    }
    currentNumber += inputValue;
  }
  if (currButtonClasses.contains("button-negative-toggle")) {
    currentNumber = (-Number(currentNumber)).toString();
    screen.textContent = currentNumber;
  }
  if (currButtonClasses.contains("button-operand") && !operand) {
    setCurrentOperandButton(currButton, inputValue);
    numbers.push(Number(currentNumber));
    currentNumber = "";
    console.log(currButton);
  }

  if (
    currButtonClasses.contains("button-operand") &&
    numbers.length > 0 &&
    currentNumber
  ) {
    resetOperandButtons();
    console.log(numbers.at(-1));
    const result = evalNumbers(numbers.at(-1), Number(currentNumber), operand);
    setCurrentOperandButton(currButton, inputValue);
    numbers.push(result);
    currentNumber = "";
    screen.textContent = result.toString();
  }

  if (currButtonClasses.contains("button-clear")) {
    resetOperandButtons();
    clearCalculator(inputValue);
  }
  console.log(
    "numbers",
    numbers,
    "operand",
    operand,
    "currentNumber",
    currentNumber
  );
}

buttons.forEach((button) =>
  button.addEventListener("click", runCalculatorOperations)
);
