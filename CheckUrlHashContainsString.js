const hash = window.location.hash;
const desiredWord = new RegExp(/Fayy/, "gi");

if (hash) {
  console.log(hash);

  //if hash contains Fayy
  if (desiredWord.test(hash))
    console.log(hash.match(desiredWord));
} else {
  console.log(`no hash`);
}
