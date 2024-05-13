"use strict";

const operandBackgroundColor = "#c0091e";
const operandColor = "#f3f3eb";
const numberButtons = document.querySelectorAll(".button-number");
const operatorButtons = document.querySelectorAll(".button-operator");
const clearButtons = document.querySelectorAll(".button-clear");
const changeSignButton = document.querySelector(".button-negative-toggle");
const equalsButton = document.querySelector(".button-equals");
const decimalButton = document.querySelector(".button-decimal");
const buttons = document.querySelectorAll(".button");
const screen = document.querySelector(".screen");

let lastNumber = 0;
let currentNumber = "";
let decimal = false;
let operator = "";

function evalNumbers(lastNumber, currentNumber, operator) {
  if (operator === "/") return Number(lastNumber) / Number(currentNumber);
  if (operator === "*") return Number(lastNumber) * Number(currentNumber);
  if (operator === "-") return Number(lastNumber) - Number(currentNumber);
  if (operator === "+") return Number(lastNumber) + Number(currentNumber);
  if (operator === "%")
    return (Number(lastNumber) / Number(currentNumber)) * 100;
}

function clearCalculator(event) {
  const clearMagnitude = event.target.dataset.input;
  if (clearMagnitude === "clearScreen") {
    currentNumber = "";
    decimal = false;
    updateScreen(0);
  }
  if (clearMagnitude === "resetAll") {
    resetOperatorButtons();
    decimal = false;
    lastNumber = 0;
    currentNumber = "";
    operator = "";
    updateScreen(0);
  }
}

function resetOperatorButtons() {
  operatorButtons.forEach((button) => {
    button.style.backgroundColor = operandBackgroundColor;
    button.style.color = operandColor;
  });
}

function setCurrentOperatorButton(currButton, inputValue) {
  currButton.style.backgroundColor = operandColor;
  currButton.style.color = operandBackgroundColor;
  operator = inputValue;
}

function operatorTransition(event) {
  const currButton = event.target;
  const inputValue = currButton.dataset.input;

  if (!operator) {
    setCurrentOperatorButton(currButton, inputValue);
    lastNumber = Number(currentNumber);
    currentNumber = "";
    decimal = false;
  }

  if (lastNumber && currentNumber) {
    resetOperatorButtons();
    lastNumber = evalNumbers(lastNumber, Number(currentNumber), operator);
    setCurrentOperatorButton(currButton, inputValue);
    currentNumber = "";
    updateScreen(lastNumber.toString().slice(0, 10));
    decimal = false;
  }
}

function equalsTransition(event) {
  if (lastNumber === 0 && !currentNumber) return;
  if (lastNumber && currentNumber && operator) {
    currentNumber = evalNumbers(lastNumber, currentNumber, operator).toString();
    lastNumber = 0;
    decimal = false;
    operator = "";
    updateScreen(currentNumber.slice(0, 10));
  }
}

function typeNumbers(event) {
  const inputValue = event.target.dataset.input;
  if (currentNumber.length < 10) {
    if (operator) {
      resetOperatorButtons();
    }
    currentNumber += inputValue;
    updateScreen(currentNumber.slice(0, 10));
  }
}

function typeDecimal(event) {
  const inputValue = event.target.dataset.input;
  if (currentNumber.length < 9 && !decimal) {
    if (operator) {
      resetOperatorButtons();
    }
    currentNumber += inputValue;
    decimal = true;
  }
}

function updateScreen(value) {
  screen.textContent = value;
}

changeSignButton.addEventListener("click", () => {
  currentNumber = (-Number(currentNumber)).toString();
  updateScreen(currentNumber);
});

numberButtons.forEach((button) =>
  button.addEventListener("click", typeNumbers)
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", operatorTransition)
);

decimalButton.addEventListener("click", typeDecimal);

clearButtons.forEach((button) =>
  button.addEventListener("click", clearCalculator)
);

equalsButton.addEventListener("click", equalsTransition);
