/**
 * selection sort starts with the min value = arr[0]
 * it then goes through the entire array and if a value is < minValue
 *
 */

async function selectionSort() {
  let i, j, minIndex;

  for (i = 0; i < divs.length; i++) {
    minIndex = i;
    for (j = i + 1; j < divs.length; j++) {
      if (userRequestedStop) {
        return;
      }

      divs[minIndex].setAttribute("id", "selected");
      divs[j].setAttribute("id", "comparing");
      await new Promise((resolve) => setTimeout(resolve, animationTimer));

      if (divs[j].offsetHeight < divs[minIndex].offsetHeight) {
        //divs[j].removeAttribute("id");
        divs[minIndex].removeAttribute("id");
        minIndex = j;
        divs[minIndex].setAttribute("id", "selected");
        await new Promise((resolve) => setTimeout(resolve, animationTimer));
      }

      
      divs[j].removeAttribute("id");
      //await new Promise((resolve) => setTimeout(resolve, animationTimer));
    }

    await swapSelection(divs[i], divs[minIndex]);
    divs = document.querySelectorAll(".data");
    divs[i].setAttribute("id", "sorted");
  }
}

function swapSelection(selectionDiv1, selectionDiv2) {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      // swap position in of divs
      let temp = selectionDiv1.style.transform;
      selectionDiv1.style.transform = selectionDiv2.style.transform;
      selectionDiv2.style.transform = temp;

      // visualize swap and swap divs in DOM
      setTimeout(() => {
        const div1Clone = selectionDiv1.cloneNode(true);
        const div2Clone = selectionDiv2.cloneNode(true);
        selectionDiv1.replaceWith(div2Clone);
        selectionDiv2.replaceWith(div1Clone);
        resolve();
      }, animationTimer);
    });
  });
}
