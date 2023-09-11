const divContainer = document.getElementById("div-container");
const buttonContainer = document.getElementById("text-button-container");
const bubbleSortSelectionButton = document.getElementById("bubble-button");
const insertionSortSelectionButton =
  document.getElementById("insertion-button");
const algoTitle = document.getElementById("sorting-name");
const animationTimer = 200;
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
    startButton.disabled = true;
  });
  resetButton.addEventListener("click", () => {
    clearSortingDivs();
    createSortingDivs();
    startButton.disabled = false;
    userRequestedStop = true;
  });
  bubbleSortSelectionButton.disabled = true;
  insertionSortSelectionButton.disabled = false;
}

function initializeInsertionSort() {
  clearSortingDivs();
  createSortingDivs();
  clearControlButtons();
  createControlButtons();
  startButton.addEventListener("click", () => {
    userRequestedStop = false;
    insertionSort();
    startButton.disabled = true;
  });
  resetButton.addEventListener("click", () => {
    clearSortingDivs();
    createSortingDivs();
    startButton.disabled = false;
    userRequestedStop = true;
  });
  bubbleSortSelectionButton.disabled = false;
  insertionSortSelectionButton.disabled = true;
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
      Math.floor(Math.random() * divContainer.offsetHeight)
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

window.onload = () => {
  createSortingDivs();
};
