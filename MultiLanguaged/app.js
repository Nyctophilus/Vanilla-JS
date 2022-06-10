const language = {
  en: {
    welcome: "Hello, this is english world",
    secc: "this is the second english statement",
  },
  ar: {
    welcome: "السلام عليكم و رحمة الله و بركاته",
    secc: "احيييه ياعم يئا دى تانى واحدة اهى",
  },
};

const langs = document.querySelectorAll("[data-lang]");

langs.forEach((lang) => {
  lang.addEventListener("click", () => {
    // Define language via window hash
    if (lang.id === "ar") {
      document.body.style.cssText = `direction: rtl`;

      document
        .querySelectorAll("[data-text]")
        .forEach((text) => {
          text.textContent = language.ar[text.id];
        });
    } else {
      document
        .querySelectorAll("[data-text]")
        .forEach((text) => {
          text.textContent = language.en[text.id];
        });
    }
  });
});
