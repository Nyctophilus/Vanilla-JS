function Capitalize(string) {
  let newString = [];
  string.split(" ").forEach(
    (w) => newString.push(w[0].toUpperCase() + w.slice(1)) //  lw string +=  w[0].toUpperCase() + w.slice(1) + " "
  );

  return newString.join(" ");
}

console.log(
  Capitalize(
    `aHLYYYYYYYYYYYYY, ali moaluuuuul ouiiiiiiiiiiiiiiiii wee el kaadya momknnnnn oooooooooooooooooooooooooo`
  )
);
