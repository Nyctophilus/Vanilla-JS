const balls = document.getElementsByClassName("ball");

document.onmousemove = (e) => {
  //event.clientX => get the horizontal coordinate of the mouse
  //window.innerWidth => get the browser width
  let x = `${(e.clientX * 100) / window.innerWidth}%`;

  //event.clientY => get the Vertical coordinate of the mouse
  //window.innerHeight => get the browser height
  let y = `${(e.clientY * 100) / window.innerHeight}%`;

  for (let ball of balls) {
    ball.style.left = x;
    ball.style.top = y;
    ball.style.transform = `translate(-${x},-${y})`;
  }

  //   red eye when go on boundries
  if (
    (e.clientY * 100) / window.innerHeight > 95 ||
    (e.clientY * 100) / window.innerHeight < 5 ||
    (e.clientX * 100) / window.innerWidth > 95 ||
    (e.clientX * 100) / window.innerWidth < 5
  ) {
    Array.from(balls).forEach((ball) => {
      ball.classList.add("red");
    });
  } else {
    Array.from(balls).forEach((ball) => {
      ball.classList.remove("red");
    });
  }
};
