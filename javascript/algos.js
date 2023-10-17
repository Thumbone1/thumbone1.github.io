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

/**
 * Initializes the passed sorting algo from ../sortingAlgos
 * @param {function} sortingAlgo
 */
function initializeSortAlgo(sortingAlgo) {
  clearSortingDivs();
  createSortingDivs();
  clearControlButtons();
  createControlButtons();
  startButton.addEventListener("click", () => {
    userRequestedStop = false;
    sortingAlgo();
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

/**
 * This function creates divs based on container width
 * a couple magic numbers here that are commented
 */
function createSortingDivs() {
  const numDivs = divContainer.offsetWidth / 27; //27 looks right
  for (let i = 0; i < numDivs; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("data");
    newDiv.style.width = `${divContainer.offsetWidth / (numDivs * 1.5)}px`; // 1.5 looks right
    newDiv.style.height = `${Math.max(
      20,
      Math.floor(Math.random() * divContainer.offsetHeight - 10)
    )}px`;
    newDiv.style.transform = `translateX(${
      i * (divContainer.offsetWidth / numDivs)
    }px)`;
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
  initializeSortAlgo(bubbleSort);
  algoTitle.innerHTML = "Bubble Sort";
});

insertionSortSelectionButton.addEventListener("click", () => {
  userRequestedStop = false;
  initializeSortAlgo(insertionSort);
  algoTitle.innerHTML = "Insertion Sort";
});

selectionSortSelectionButton.addEventListener("click", () => {
  userRequestedStop = false;
  initializeSortAlgo(selectionSort);
  algoTitle.innerHTML = "Selection Sort";
});

window.onload = () => {
  createSortingDivs();
};

window.addEventListener("resize", () => {
  clearSortingDivs();
  createSortingDivs();
});
