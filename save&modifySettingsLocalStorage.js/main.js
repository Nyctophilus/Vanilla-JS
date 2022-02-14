// add defaults if(localstorage)

// truey falsey pattern✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️✔️
document.body.classList.add(
  localStorage.getItem("PageColor") || "purple"
);

// if (localStorage.length > 0)
//   document.body.classList.add(
//     localStorage.getItem("PageColor")
//   );

const el = document.querySelectorAll(".color-switcher li");
let classeslist = [];

el.forEach((c) => {
  classeslist.push(c.dataset.color);

  c.addEventListener(
    "click",
    () => {
      document.body.classList.remove(...classeslist);
      document.body.classList.add(c.dataset.color);

      //   save data to localStorage
      localStorage.setItem("PageColor", c.dataset.color);
    },
    false
  );
});
