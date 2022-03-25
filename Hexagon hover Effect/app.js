const curser = document.querySelector(".curser");

document.addEventListener("mousemove", (e) => {
  let x = e.clientX,
    y = e.clientY;

  curser.style.left = `${x}px`;
  curser.style.top = `${y}px`;
});
