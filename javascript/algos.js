const divContainer = document.getElementById("div-container");
const buttonContainer = document.getElementById("text-button-container");
const bubbleSortSelectionButton = document.getElementById("bubble-button");
const insertionSortSelectionButton =
  document.getElementById("insertion-button");
const selectionSortSelectionButton = document.getElementById(
  "selectionSort-button"
);
const algoTitle = document.getElementById("sorting-name");
const animationTimer = 300;
let divs;
let userRequestedStop = false;
let startButton;
let resetButton;

function initializeBubbleSort() {
  clearSortingDivs();
  createSortingDivs();
  clearControlButtons();
  createControlButtons();
  startButton.addEventListener("click", () => {
    userRequestedStop = false;
    bubbleSort();
    disallowSelectionButtons();
    startButton.disabled = true;
  });
  resetButton.addEventListener("click", () => {
    clearSortingDivs();
    createSortingDivs();
    allowSelectionButtons();
    startButton.disabled = false;
    userRequestedStop = true;
  });
}

function initializeInsertionSort() {
  clearSortingDivs();
  createSortingDivs();
  clearControlButtons();
  createControlButtons();
  startButton.addEventListener("click", () => {
    userRequestedStop = false;
    insertionSort();
    disallowSelectionButtons();
    startButton.disabled = true;
  });
  resetButton.addEventListener("click", () => {
    clearSortingDivs();
    createSortingDivs();
    allowSelectionButtons();
    startButton.disabled = false;
    userRequestedStop = true;
  });
}

function initializeSelectionSort() {
  clearSortingDivs();
  createSortingDivs();
  clearControlButtons();
  createControlButtons();
  startButton.addEventListener("click", () => {
    userRequestedStop = false;
    selectionSort();
    disallowSelectionButtons();
    startButton.disabled = true;
  });
  resetButton.addEventListener("click", () => {
    clearSortingDivs();
    createSortingDivs();
    allowSelectionButtons();
    startButton.disabled = false;
    userRequestedStop = true;
  });
}

function createControlButtons() {
  startButton = document.createElement("button");
  startButton.setAttribute("id", "start-button");
  startButton.innerHTML = "START";
  buttonContainer.appendChild(startButton);

  resetButton = document.createElement("button");
  resetButton.setAttribute("id", "reset-button");
  resetButton.innerHTML = "RESET";
  buttonContainer.appendChild(resetButton);
}

function createSortingDivs() {
  for (var i = 1; i < 30; i++) {
    var newDiv = document.createElement("div");
    newDiv.classList.add("data");
    newDiv.style.height = `${Math.max(
      20,
      Math.floor(Math.random() * divContainer.offsetHeight - 10)
    )}px`;
    newDiv.style.transform = `translate(${i * 33}px)`;
    divContainer.appendChild(newDiv);
  }
  divs = document.querySelectorAll(".data");
}

function clearSortingDivs() {
  divContainer.innerHTML = "";
}

function clearControlButtons() {
  buttonContainer.innerHTML = "";
}

function disallowSelectionButtons() {
  selectionSortSelectionButton.disabled = true;
  bubbleSortSelectionButton.disabled = true;
  insertionSortSelectionButton.disabled = true;
}

function allowSelectionButtons() {
  selectionSortSelectionButton.disabled = false;
  bubbleSortSelectionButton.disabled = false;
  insertionSortSelectionButton.disabled = false;
}

bubbleSortSelectionButton.addEventListener("click", () => {
  userRequestedStop = false;
  initializeBubbleSort();
  algoTitle.innerHTML = "Bubble Sort";
});

insertionSortSelectionButton.addEventListener("click", () => {
  userRequestedStop = false;
  initializeInsertionSort();
  algoTitle.innerHTML = "Insertion Sort";
});

selectionSortSelectionButton.addEventListener("click", () => {
  userRequestedStop = false;
  initializeSelectionSort();
  algoTitle.innerHTML = "Selection Sort";
});

window.onload = () => {
  createSortingDivs();
};
