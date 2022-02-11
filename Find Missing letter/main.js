function findMissingLetterIn(word) {
  let alpha = "abcdefghijklmnopqrstuvwxyz";
  let start = word[0];

  let cutAlpha = alpha.slice(alpha.indexOf(start));

  for (let i = 0; i < word.length; i++) {
    if (word[i] !== cutAlpha[i]) return cutAlpha[i]; // (!word.includes(cutAlpha[i]))
  }

  return `No Missing Letter In Sequence`;
}

console.log(findMissingLetterIn("defgi")); // h
console.log(findMissingLetterIn("abcdeghi")); // f
console.log(findMissingLetterIn("xyz")); // No Missing Letter In Sequence
