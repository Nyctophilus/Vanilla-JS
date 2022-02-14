// Now in the JavaScript, we could add a click event handler for every tile.
// But a much simpler and more efficient option is to set the click event handler on the parent,
// and rely on event bubbling to ensure that the handler is executed when the user clicks on a tile:

function random(num) {
  return Math.floor(Math.random() * num);
}

function bgChange() {
  return `rgb(${random(255)}, ${random(255)}, ${random(
    255
  )})`;
}

document
  .getElementById("container")
  .addEventListener("click", (e) => {
    console.log(e.target);

    e.target.style.backgroundColor = bgChange();
  });
