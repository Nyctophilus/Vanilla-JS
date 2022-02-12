function removeDuplicateWordsFrom(string) {
  return [...new Set(string.split(" "))].join(" ");
}

console.log(
  removeDuplicateWordsFrom(
    "Hello Elzero Web Web Hello School"
  )
);
// Hello Elzero Web School

//  for (let i = 0; i < wordsList.length; i++) {
// if (result.indexOf(wordsList[i]) === -1) {
//     result.push(wordsList[i]);
//   }
// }
