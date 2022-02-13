const clock = document.getElementById("clock");

let hours;
let minutes;
let seconds;
setInterval(() => {
  hours = new Date().getHours();
  minutes = new Date().getMinutes();
  seconds = new Date().getSeconds();

  if (hours < 0) hours = `0${hours}`;
  if (minutes < 0) minutes = `0${minutes}`;
  if (seconds < 0) seconds = `0${seconds}`;

  clock.innerHTML = `${hours}:${minutes}:${seconds}`;
}, 1000);
