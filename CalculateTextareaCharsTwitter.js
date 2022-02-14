const txtArea = document.querySelector("form #twitter");
const charsLeft = txtArea.nextElementSibling;
const maxLen = txtArea.getAttribute("maxlength");

txtArea.oninput = () => {
  console.log(txtArea.value);

  charsLeft.textContent = maxLen - txtArea.value.length;
  charsLeft.textContent <= 0
    ? (charsLeft.style.color = "red")
    : (charsLeft.style.color = "initial");
};
