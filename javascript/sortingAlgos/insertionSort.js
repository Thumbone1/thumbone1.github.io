const insertionAnimationSpeed = 100;
const insertionNumDivs = 100;
var insertionAnimationInterval;
var insertionCurrentStep = 0;
let insertionDivArr = [];
let insertionAnimationArr = [];
let insertionStartButton;
let insertionResetButton;

function createinsertionDivArr() {
  for (var i = 1; i <= insertionNumDivs; i++) {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "data");
    newDiv.style.height = `${i * 4}px`;
    newDiv.style.width = "5px";

    insertionDivArr.push(newDiv);

    for (let i = insertionDivArr.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [insertionDivArr[i], insertionDivArr[randomIndex]] = [
        insertionDivArr[randomIndex],
        insertionDivArr[i],
      ];
    }
  }
}

function drawinsertionDivArr() {
  for (var line of insertionDivArr) {
    document.getElementById("div-container").appendChild(line);
  }
}

function resetInsertionAnimation() {
  var container = document.getElementById("div-container");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  clearInterval(insertionAnimationInterval);
  insertionAnimationInterval = null;
  insertionDivArr = [];
  insertionAnimationArr = [];
  insertionCurrentStep = 0;
  createinsertionDivArr();
  drawinsertionDivArr();
  insertionSort(insertionDivArr);
}

function insertionSort(arr) {
  let i, j, currentDiv;

  for (i = 1; i < arr.length; i++) {
    currentDiv = arr[i];
    j = i - 1;
    insertionAnimationArr.push([j, j + 1, arr.slice()]);
    while (j >= 0 && arr[j].offsetHeight > currentDiv.offsetHeight) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = currentDiv;
  }
  insertionAnimationArr.push([0, arr.length-1, arr.slice()]);
}

function visualizeInsertionSort() {
  if (insertionCurrentStep < insertionAnimationArr.length) {
    /**
     * initial visualization - no highlighting
     * you will use the insertionAnimationArr ([j, j+1, sortedArr], [j, j+1, sortedArr], ...)
     * first thing: Go through the sortedArr step by step
     * and append the div elements to the parent. Clear the DOM before each step
     */

    // find the container for the div elements
    const divContainer = document.getElementById("div-container");
    // use deconstructor on the animationArr to get the current step
    const [index1, index2, sortedArr] =
      insertionAnimationArr[insertionCurrentStep];
    //clear the div container
    divContainer.innerHTML = "";

    insertionHighlightComparison(sortedArr[index1], sortedArr[index2]);
    //add sortedArr to divContainer
    for (const div of sortedArr) {
      divContainer.appendChild(div);
    }
    insertionCurrentStep++;
  } else {
    clearInterval(insertionAnimationInterval);
    insertionAnimationInterval = null;
  }
}

function insertionHighlightComparison(div1, div2) {
  div1.setAttribute("id", "comparing");
  div2.setAttribute("id", "comparing");

  setTimeout(() => {
    div1.setAttribute("id", "");
    div2.setAttribute("id", "");
  }, insertionAnimationSpeed);
}

function startInsertionAnimation() {
  if (!insertionAnimationInterval) {
    insertionAnimationInterval = setInterval(
      visualizeInsertionSort,
      insertionAnimationSpeed * 2
    );
  }
}

// function swap(div1, div2) {
//   const afterdiv2 = div2.nextElementSibling;
//   const parent = div2.parentNode;
//   div1.replaceWith(div2);
//   parent.insertBefore(div1, afterdiv2);
// }

function initializeInsertionSort() {
  document.getElementById("div-container").innerHTML = "";
  document.getElementById("text-button-container").innerHTML = "";
  insertionStartButton = document.createElement("button");
  insertionStartButton.setAttribute("id", "start-button");
  insertionStartButton.innerHTML = "START";

  insertionResetButton = document.createElement("button");
  insertionResetButton.setAttribute("id", "reset-button");
  insertionResetButton.innerHTML = "RESET";

  document
    .getElementById("text-button-container")
    .appendChild(insertionStartButton);
  document
    .getElementById("text-button-container")
    .appendChild(insertionResetButton);

  document.getElementById("insertion-button").disabled = true;
  document.getElementById("sorting-name").innerHTML = "Insertion Sort";

  createinsertionDivArr();
  drawinsertionDivArr();
  insertionSort(insertionDivArr);
  insertionStartButton.addEventListener("click", startInsertionAnimation);
  insertionResetButton.addEventListener("click", resetInsertionAnimation);

}
