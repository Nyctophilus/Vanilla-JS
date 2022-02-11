function convert(num) {
  const arrOfNumbers = [...num.toString()];
  const len = arrOfNumbers.length;
  let newArr = [];

  for (let i = 0; i < len; i++) {
    let lastEle = arrOfNumbers[arrOfNumbers.length - 1];

    arrOfNumbers.pop();

    newArr.push(parseInt(lastEle));
  }

  return newArr;

  // return [...num.toString()]
  //   .reverse()
  //   .map((n) => parseInt(n));
}

console.log(convert(564987654)); // [4, 5, 6, 7, 8, 9, 4, 6, 5]
console.log(convert(529132)); // [2, 3, 1, 9, 2, 5]
