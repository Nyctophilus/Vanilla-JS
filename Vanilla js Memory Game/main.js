document.querySelector(".control-buttons span").onclick =
  () => {
    let userName = prompt("What's your name?");

    if (userName) {
      document.querySelector(".name span").textContent =
        userName;
    } else {
      document.querySelector(
        ".name span"
      ).textContent = `Unknown`;
    }

    document.querySelector(".control-buttons").remove();
  };

let duration = 1000;

let blocksContainer = document.querySelector(
  ".memory-game-blocks"
);

let blocks = Array.from(blocksContainer.children);

let orderRange = Array.from(Array(blocks.length).keys());

// orderRange.sort(() => Math.random() - 0.5);
console.log(orderRange);
shuffle(orderRange);
console.log(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
});

//   eventListener to class "flip" class on click
function addClassFlip(e) {
  flipBlock(e.target.parentElement);
}

document
  .querySelector(".memory-game-blocks")
  .addEventListener("click", addClassFlip);

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");

  //   get flipped blocks
  let flippedBlocks = blocks.filter((block) =>
    block.classList.contains("is-flipped")
  );

  if (flippedBlocks.length === 2) {
    //   if 2 flipped stop clicking
    stopClicking();

    //   check if the 2Flipped is matched
    matchedBlocks(flippedBlocks[0], flippedBlocks[1]);
  }
}

function stopClicking() {
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

function matchedBlocks(first, second) {
  let tries = document.querySelector(".tries span");

  if (
    first.dataset.technology === second.dataset.technology
  ) {
    first.classList.add("has-match");
    second.classList.add("has-match");

    first.classList.remove("is-flipped");
    second.classList.remove("is-flipped");

    document.getElementById("success").play();
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;

    setTimeout(() => {
      first.classList.remove("is-flipped");
      second.classList.remove("is-flipped");
    }, duration);
  }

  document.getElementById("fail").play();
}

// Shuffle Function
function shuffle(array) {
  // Settings Vars
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);

    // Decrease Length By One
    current--;

    // [1] Save Current Element in Stash
    temp = array[current];

    // [2] Current Element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element From Stash
    array[random] = temp;
  }

  return array;
}
