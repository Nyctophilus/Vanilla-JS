function longestWordIn(string) {
  let arrayOfWords = string.split(" ");

  let longestword = arrayOfWords.reduce((acc, curr) =>
    curr.length > acc.length ? curr : acc
  );

  return longestword;
}

console.log(
  longestWordIn(
    `hello Muuuuuuuhammed, im Bot test to get the longest word of me`
  )
);
