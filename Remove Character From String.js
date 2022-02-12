function removeCharFrom(string, char) {
  let reg = new RegExp(`${char}`, "gi");

  let Modifiedstring = string.replace(reg, "");

  return Modifiedstring;
}

console.log(
  removeCharFrom("ElddzeroD WebDD ddSchool", "d")
);
// console.log(removeCharFrom("ElxzeroX Web Sxchool", "x"));
// console.log(removeCharFrom("Elzero@ Web@@ @@School", "@"));

// function removeCharFrom(string, char) {
//   return string
//     .split("")
//     .filter(
//       (w) =>
//         w !== char.toLowerCase() && w !== char.toUpperCase()
//     )
//     .join("");
// }
