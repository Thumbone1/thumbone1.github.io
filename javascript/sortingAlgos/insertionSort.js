/**
 * async bubble sort algo visualizer after I found out
 * what async and promises are...also now that I understand
 * more about moving divs around
 *
 */

async function insertionSort() {
  let i, j, currentDiv;

  for (i = 1; i < divs.length; i++) {
    currentDiv = divs[i];
    j = i - 1;

    while (j >= 0 && divs[j].offsetHeight > currentDiv.offsetHeight) {
      if (userRequestedStop) {
        return;
      }
      currentDiv.setAttribute("id", "comparing");
      divs[j].setAttribute("id", "comparing");

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, animationTimer);
      });

      await swapInsertion(divs[j + 1], divs[j]);

      currentDiv.removeAttribute("id");
      divs[j].removeAttribute("id");
      divs = document.querySelectorAll(".data");

      j--;
    }
    
  }
  divs.forEach(insertionDiv => {
    insertionDiv.setAttribute("id", "sorted");
  });
  for (let insertionDiv of divs) {
    await new Promise((resolve) => {
      setTimeout(() => {
        insertionDiv.removeAttribute("id");
        resolve();
      }, animationTimer / 2);
    });
  }
}

function swapInsertion(insertionDiv1, insertionDiv2) {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      let temp = insertionDiv1.style.transform;
      insertionDiv1.style.transform = insertionDiv2.style.transform;
      insertionDiv2.style.transform = temp;

      setTimeout(() => {
        divContainer.insertBefore(insertionDiv1, insertionDiv2);
        resolve();
      }, animationTimer);
    });
  });
}
