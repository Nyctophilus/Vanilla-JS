const arrOfImgs = [
  "https://raw.githubusercontent.com/Nyctophilus/Special-Template/5acc6556f0f27dafe8241526e04847782157d910/images/Moon.svg",
  "https://raw.githubusercontent.com/Nyctophilus/Special-Template/5acc6556f0f27dafe8241526e04847782157d910/images/blob.svg",
  "https://raw.githubusercontent.com/Nyctophilus/Special-Template/5acc6556f0f27dafe8241526e04847782157d910/images/bg1.webp",
  "https://raw.githubusercontent.com/Nyctophilus/Special-Template/5acc6556f0f27dafe8241526e04847782157d910/images/bg2.webp",
  "https://raw.githubusercontent.com/Nyctophilus/Special-Template/5acc6556f0f27dafe8241526e04847782157d910/images/bg3.webp",
  "https://raw.githubusercontent.com/Nyctophilus/Special-Template/5acc6556f0f27dafe8241526e04847782157d910/images/bg4.webp",
];

const img = document.querySelector(
  'img[alt="imgChangeRandomly"]'
);

changeRandomly(img, arrOfImgs);

function changeRandomly(changableBox, arr) {
  setInterval(() => {
    changableBox.src =
      arr[Math.trunc(Math.random() * arr.length)];
  }, 2000);
}
