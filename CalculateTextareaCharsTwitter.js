const txtArea = document.querySelector("form #twitter");
const charsLeft = txtArea.nextElementSibling;

txtArea.oninput = () => {
  console.log(txtArea.value);

  charsLeft.textContent = 50 - txtArea.value.length;
  charsLeft.textContent < 0
    ? (charsLeft.style.color = "red")
    : (charsLeft.style.color = "initial");
};
