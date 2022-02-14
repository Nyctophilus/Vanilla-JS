const pwInput = document.querySelector(
  "#ShowHidePassword input[type='password']"
);
const btn = document.querySelector(
  "#ShowHidePassword + button"
);

btn.onclick = () => {
  if (pwInput.value) {
    if (pwInput.getAttribute("type") === "password")
      pwInput.setAttribute("type", "text");
    else if (pwInput.getAttribute("type") === "text")
      pwInput.setAttribute("type", "password");
  }
};
