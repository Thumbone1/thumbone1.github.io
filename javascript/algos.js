var animationInterval;
var currentStep = 0;
var numDivs = 100;
let divArr = [];
let animationArr = [];
const animationSpeed = 10;
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");

function createDivArr() {
  for (var i = 1; i <= numDivs; i++) {
    var newDiv = document.createElement("div");

    newDiv.setAttribute("id", `${i}`);
    newDiv.setAttribute("class", "data");
    newDiv.style.height = `${i * 4}px`;
    newDiv.style.width = "5px";

    divArr.push(newDiv);

    for (let i = divArr.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [divArr[i], divArr[randomIndex]] = [divArr[randomIndex], divArr[i]];
    }
  }
}

function drawDivArr() {
  for (var line of divArr) {
    document.getElementById("visualization-container").appendChild(line);
  }
}

function resetAnimation() {
  var container = document.getElementById("visualization-container");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  clearInterval(animationInterval);
  animationInterval = null;
  divArr = [];
  animationArr = [];
  currentStep = 0;
  createDivArr();
  drawDivArr();
  bubbleSort(divArr);
}

function visualizeBubbleSort() {
  startButton.disabled = true;
  resetButton.disabled = true;
  if (currentStep < animationArr.length) {
    div1Element = animationArr[currentStep][0];
    div2Element = animationArr[currentStep][1];

    highlightComparison(div1Element, div2Element);

    if (div1Element.offsetHeight > div2Element.offsetHeight) {
      swap(div1Element, div2Element);
    }

    currentStep++;
  } else {
    startButton.disabled = false;
    resetButton.disabled = false;
  }
}

function highlightComparison(div1, div2) {
  const div1OriginalId = div1.getAttribute("id");
  const div2OriginalId = div2.getAttribute("id");

  div1.setAttribute("id", "comparing");
  div2.setAttribute("id", "comparing");

  setTimeout(() => {
    div1.setAttribute("id", div1OriginalId);
    div2.setAttribute("id", div2OriginalId);
  }, animationSpeed);
}

function swap(div1, div2) {
  const afterdiv2 = div2.nextElementSibling;
  const parent = div2.parentNode;
  div1.replaceWith(div2);
  parent.insertBefore(div1, afterdiv2);
}

function bubbleSort(arr) {
  var i, j, temp;
  var swapped;

  for (i = 0; i < divArr.length - 1; i++) {
    swapped = false;
    for (j = 0; j < divArr.length - i - 1; j++) {
      var firstDivId = parseInt(arr[j].getAttribute("id"));
      var secondDivId = parseInt(arr[j + 1].getAttribute("id"));
      animationArr.push([arr[j], arr[j + 1]]);
      if (firstDivId > secondDivId) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }
    if (swapped == false) {
      break;
    }
  }
}

function startAnimation() {
  if (!animationInterval) {
    animationInterval = setInterval(visualizeBubbleSort, animationSpeed * 2);
  }
}

window.onload = () => {
  createDivArr();
  drawDivArr();
  bubbleSort(divArr);
};

startButton.addEventListener("click", startAnimation);
resetButton.addEventListener("click", resetAnimation);
