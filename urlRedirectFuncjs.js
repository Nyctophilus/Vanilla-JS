const btn = document.querySelector("button");

btn.onclick = redirectMe("https://www.google.com");

function redirectMe(url) {
  if (url) window.location = url;

  console.log(`click`);
}
