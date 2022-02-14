// more advanced way

const inpFocus = document.querySelector(
  "input[placeholder]"
);
const placeHolderValue =
  inpFocus.getAttribute("placeholder");

// .
// .
// .
// ..

// Reusable Function
togglePlaceholder(inpFocus);

function togglePlaceholder(element) {
  element.addEventListener("focus", () => {
    element.setAttribute("placeholder", "");
  })
    ? ""
    : element.addEventListener("blur", () => {
        element.setAttribute(
          "placeholder",
          placeHolderValue
        );
      });
}

// .
// .
// .
// .
// .
// .
// .
// .

// if (
//   inpFocus.addEventListener("focus", () => {
//     inpFocus.setAttribute("placeholder", "");
//   })
// )
//   console.log(`casdsa`);
// else if (
//   inpFocus.addEventListener("blur", () => {
//     inpFocus.setAttribute("placeholder", placeHolderValue);
//   })
// )
//   console.log(`sadasd`);

// togglePlaceholder();
// function togglePlaceholder() {
//   if (inpFocus.onfocus()={})
//     inpFocus.setAttribute("placeholder", "");
//   else
//     inpFocus.setAttribute("placeholder", placeHolderValue);
// }

// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .

// const inpFocus = document.querySelector(
//   "input[placeholder]"
// );
// const placeHolderValue =
//   inpFocus.getAttribute("placeholder");

// inpFocus.onfocus = () => {
//   console.log(`U foooocus on me,Aww ☺️ `);

//   inpFocus.removeAttribute("placeholder");
// };

// inpFocus.onblur = () => {
//   console.log(`U foooocus on me,Aww ☺️ `);

//   inpFocus.setAttribute("placeholder", placeHolderValue);
// };
