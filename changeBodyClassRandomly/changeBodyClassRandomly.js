const classlist = [
  "class-one",
  "class-two",
  "class-three",
  "class-four",
  "class-five",
];

changeBodyClass();

function changeBodyClass() {
  setInterval(() => {
    document.body.classList =
      classlist[
        Math.trunc(Math.random() * classlist.length)
      ];
  }, 1000);
}
