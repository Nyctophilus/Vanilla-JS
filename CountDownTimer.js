let seconds = 2;
let timer = document.getElementById("timer");

let counterFunc = setInterval(() => {
  "use strict";

  secondsCalc();
}, 1000);

function secondsCalc() {
  "use strict";
  let minutes = Math.round(seconds / 60);

  let secondsRem = seconds % 60;

  timer.textContent = `${minutes} : ${secondsRem}`;
  if (seconds > 0) seconds--;
  else {
    clearInterval(counterFunc);
    timer.textContent = "Done!";
  }
}
