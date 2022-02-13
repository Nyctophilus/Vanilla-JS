const inpFocus = document.querySelector(
  "input[placeholder]"
);
const placeHolderValue =
  inpFocus.getAttribute("placeholder");

inpFocus.onfocus = () => {
  console.log(`U foooocus on me,Aww ☺️ `);

  inpFocus.removeAttribute("placeholder");
};

inpFocus.onblur = () => {
  console.log(`U foooocus on me,Aww ☺️ `);

  inpFocus.setAttribute("placeholder", placeHolderValue);
};
