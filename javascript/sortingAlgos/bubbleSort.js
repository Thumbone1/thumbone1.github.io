/**
 * async bubble sort algo visualizer after I found out
 * what async and promises are...also now that I understand
 * more about moving divs around
 *
 * learned to work with the divs from https://www.geeksforgeeks.org/bubble-sort-visualization-using-javascript/
 */

function swapBubble(div1, div2) {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      let temp = div1.style.transform;
      div1.style.transform = div2.style.transform;
      div2.style.transform = temp;

      setTimeout(() => {
        divContainer.insertBefore(div2, div1);

        resolve();
      }, animationTimer);
    });
  });
}

async function bubbleSort() {
  let divs = document.querySelectorAll(".data");

  for (let i = 0; i < divs.length; i++) {
    for (let j = 0; j < divs.length - i - 1; j++) {
      if (userRequestedStop) {
        return;
      }

      let div1 = divs[j];
      let div2 = divs[j + 1];

      div1.setAttribute("id", "comparing");
      div2.setAttribute("id", "comparing");

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, animationTimer);
      });

      if (div1.offsetHeight > div2.offsetHeight) {
        await swapBubble(div1, div2);
      }
      divs = document.querySelectorAll(".data");
      div1.setAttribute("id", "");
      div2.setAttribute("id", "");
    }

    divs[divs.length - i - 1].setAttribute("id", "sorted");
  }

  //fancy finish
  for (let div of divs) {
    await new Promise((resolve) => {
      setTimeout(() => {
        div.removeAttribute("id");
        resolve();
      }, animationTimer/2);
    });
  }
}
