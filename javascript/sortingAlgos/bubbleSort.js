const bubbleAnimationSpeed = 100;
const bubbleNumDivs = 100;
var bubbleAnimationInt;
var bubbleCurrentStep = 0;
let bubbleDivArr = [];
let bubbleAnimationArr = [];
let bubbleStartButton;
let bubbleResetButton;

function createbubbleDivArr() {
  for (var i = 1; i <= bubbleNumDivs; i++) {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "data");
    newDiv.style.height = `${i * 4}px`;
    newDiv.style.width = "5px";

    bubbleDivArr.push(newDiv);

    for (let i = bubbleDivArr.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [bubbleDivArr[i], bubbleDivArr[randomIndex]] = [
        bubbleDivArr[randomIndex],
        bubbleDivArr[i],
      ];
    }
  }
}

function drawbubbleDivArr() {
  for (var line of bubbleDivArr) {
    document.getElementById("div-container").appendChild(line);
  }
}

function resetBubbleAnimation() {
  var container = document.getElementById("div-container");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  clearInterval(bubbleAnimationInt);
  bubbleAnimationInt = null;
  bubbleDivArr = [];
  bubbleAnimationArr = [];
  bubbleCurrentStep = 0;
  createbubbleDivArr();
  drawbubbleDivArr();
  bubbleSort(bubbleDivArr);
}

function bubbleSort(bubbleArr) {
  var i, j, temp;
  var swapped;

  for (i = 0; i < bubbleDivArr.length - 1; i++) {
    swapped = false;
    for (j = 0; j < bubbleDivArr.length - i - 1; j++) {
      var firstDivHeight = bubbleArr[j].offsetHeight;
      var secondDivHeight = bubbleArr[j + 1].offsetHeight;
      bubbleAnimationArr.push([bubbleArr[j], bubbleArr[j + 1]]);
      if (firstDivHeight > secondDivHeight) {
        temp = bubbleArr[j];
        bubbleArr[j] = bubbleArr[j + 1];
        bubbleArr[j + 1] = temp;
        swapped = true;
      }
    }
    if (swapped == false) {
      break;
    }
  }
}

function visualizeBubbleSort() {
  if (bubbleCurrentStep < bubbleAnimationArr.length) {
    div1Element = bubbleAnimationArr[bubbleCurrentStep][0];
    div2Element = bubbleAnimationArr[bubbleCurrentStep][1];

    bubbleHighlightComparison(div1Element, div2Element);

    if (div1Element.offsetHeight > div2Element.offsetHeight) {
      bubbleSwap(div1Element, div2Element);
    }

    bubbleCurrentStep++;
  }
}

function bubbleHighlightComparison(div1, div2) {
  div1.setAttribute("id", "comparing");
  div2.setAttribute("id", "comparing");

  setTimeout(() => {
    div1.setAttribute("id", "");
    div2.setAttribute("id", "");
  }, bubbleAnimationSpeed);
}

function bubbleSwap(div1, div2) {
  const afterdiv2 = div2.nextElementSibling;
  const parent = div2.parentNode;
  div1.replaceWith(div2);
  parent.insertBefore(div1, afterdiv2);
}

function startBubbleAnimation() {
  if (!bubbleAnimationInt) {
    bubbleAnimationInt = setInterval(
      visualizeBubbleSort,
      bubbleAnimationSpeed * 2
    );
  }
}

function initializeBubbleSort() {
  document.getElementById("div-container").innerHTML = "";
  document.getElementById("text-button-container").innerHTML = "";
  bubbleStartButton = document.createElement("button");
  bubbleStartButton.setAttribute("id", "start-button");
  bubbleStartButton.innerHTML = "START";

  bubbleResetButton = document.createElement("button");
  bubbleResetButton.setAttribute("id", "reset-button");
  bubbleResetButton.innerHTML = "RESET";

  document
    .getElementById("text-button-container")
    .appendChild(bubbleStartButton);
  document
    .getElementById("text-button-container")
    .appendChild(bubbleResetButton);

  document.getElementById("bubble-button").disabled = true;
  document.getElementById("sorting-name").innerHTML = "Bubble Sort";

  createbubbleDivArr();
  drawbubbleDivArr();
  bubbleSort(bubbleDivArr);
  bubbleStartButton.addEventListener("click", startBubbleAnimation);
  bubbleResetButton.addEventListener("click", resetBubbleAnimation);
}
