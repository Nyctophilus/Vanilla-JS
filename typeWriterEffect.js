const typeWriter = document.getElementById(
  "typeWriterEffect"
);

const txt =
  "Hello from the other side, This is Medo Realm!!!";

typeWriterFunc();

function typeWriterFunc() {
  let i = 0;
  const typeWriterEffect = setInterval(() => {
    typeWriter.textContent += txt[i];
    i++;

    if (i > txt.length - 1) clearInterval(typeWriterEffect);
  }, 100);
}
