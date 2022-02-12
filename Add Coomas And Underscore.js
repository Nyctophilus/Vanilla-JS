//RegEx🙂
function regEx(num) {
  let regEx = /\w{3}/g;

  let part = num.toString().match(regEx).toString();
  //   console.log(part);
  let result = num.toString().replace(regEx, `${part},`);

  return part;
}

// My solution
function addCommasAndUnderscore(num) {
  let arrNum = num.toString().split("");
  let len = arrNum.length;

  if (len <= 3) return num;
  else {
    arrNum.splice(-3, 0, "_");

    let commaNums = Math.ceil((len - 3) / 3 - 1);

    // console.log(commaNums);
    if (len > 6) {
      arrNum.splice(arrNum.indexOf("_") - 3, 0, ",");

      if (len > 9) {
        for (let i = 0; i < commaNums - 1; i++)
          arrNum.splice(arrNum.indexOf(",") - 3, 0, ",");
      }

      //     console.log(
      //       arrNum.splice(arrNum.indexOf("_") - 3, 0, ",")
      //     );
      //   console.log(
      //     arrNum.splice(arrNum.indexOf(",") - 3, 0, ",")
      //   );
      //   console.log(
      //     arrNum.splice(arrNum.indexOf(",") - 3, 0, ",")
      //   );
    }

    return arrNum.join("");
  }
}

console.log(addCommasAndUnderscore(120)); // 120
console.log(addCommasAndUnderscore(1530)); // 1_530
console.log(addCommasAndUnderscore(120510650)); // 120,510_650
console.log(addCommasAndUnderscore(510650480910)); // 510,650,780_910
console.log(addCommasAndUnderscore(12069057014032)); // 12,069,057,014_032

// toLocaleString()🙃
// function addCommasAndUnderscore(num) {
//     // Convert To String
//     let result = num.toLocaleString(); // Try Another Solution With RegExp
//     // Convert To Array
//     result = result.split("");
//     // Update The Last Comma Value
//     result[result.length - 4] = "_";
//     // Convert To String
//     result = result.join("");
//     return result;
//   }
