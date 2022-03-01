const startButton = document.querySelector(".start"),
  lv1NameSpan = document.querySelector(".message .lvl"),
  secondsSpan = document.querySelector(".message .seconds"),
  theWord = document.querySelector(".the-word"),
  upcomingWords = document.querySelector(".upcoming-words"),
  input = document.querySelector(".the-word + input"),
  timeleftSpan = document.querySelector(".time span"),
  scoreGot = document.querySelector(".score .got"),
  scoreTotal = document.querySelector(".score .total"),
  finishMessage = document.querySelector(".finish"),
  selectDiff = document.querySelector("#diff");

let words = [
  "Github",
  "Twitter",
  "Dependencies",
  "Destructuring",
  "Witcher",
  "Istagram",
  "Glupjs",
  "Pugjs",
  "Programming",
  "Emotional",
  "Intelligence",
  "SASS",
  "Bootstrap",
  "Jestjs",
  "React",
  "Boom",
  "Flu",
  "Web",
  "App",
  "Vue",
  "CMD",
  "Codepen",
  "Nodejs",
  "Nextjs",
  "Javascript",
  "Developer",
  "FullStack",
  "Is",
  "dwxx",
  "CSS",
  "HTML",
  "JS",
  "King",
];

let newArr = [];

// Settings levels
const lvls = {
  Easy: 7,
  Normal: 5,
  Hard: 3,
};

let defualtLvlName, defualtLvlSeconds;
AdjustArrDiff(defualtLvlName);

function setDefualtsDiff() {
  defualtLvlName = selectDiff.value;
  defualtLvlSeconds = lvls[defualtLvlName];

  //  Setting Level Name + Seconds + Score
  lv1NameSpan.innerHTML = defualtLvlName;
  secondsSpan.innerHTML = defualtLvlSeconds;
  timeleftSpan.innerHTML = defualtLvlSeconds;
  scoreTotal.innerHTML = words.length;

  newArr = AdjustArrDiff(defualtLvlName);
  scoreTotal.innerHTML = newArr.length;
}

setDefualtsDiff();
selectDiff.addEventListener("input", () => {
  setDefualtsDiff();

  // create dymanic instructions div
  modifyInstructions();
});

// Disable paste event
input.onpaste = () => {
  return false;
};

// Start Game
startButton.onclick = function () {
  this.remove();
  input.focus();

  //   Generate Random Words Function
  genWords();
};

function genWords() {
  let randomWord =
      newArr[Math.trunc(Math.random() * newArr.length)],
    wordIndex = newArr.indexOf(randomWord);

  // remove that word from the array
  newArr.splice(wordIndex, 1);

  //   show the random word
  theWord.innerHTML = randomWord;
  //   empty upcoming words
  upcomingWords.innerHTML = "";
  //  Generate Words
  for (let i = 0; i < newArr.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(newArr[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }

  //   Call Play Function
  startPlay();
}

// [x] add 3 sec for the 1st word only
let first = true;
function startPlay() {
  timeleftSpan.innerHTML = defualtLvlSeconds;

  if (first) timeleftSpan.innerHTML = defualtLvlSeconds + 3;

  const start = setInterval(() => {
    timeleftSpan.innerHTML--;

    if (timeleftSpan.innerHTML <= 0) {
      clearInterval(start);

      if (
        theWord.innerHTML.toLocaleLowerCase() ===
        input.value.toLocaleLowerCase()
      ) {
        input.value = "";
        scoreGot.innerHTML++;

        // Recall gen Function
        if (newArr.length) {
          genWords();
        } else {
          finisingMsg("good", "Congratzzzz! 🥳🥳");
          //   remove words box
          upcomingWords.remove();
          saveToStorage();
          // [ ] restart button
        }
      } else {
        finisingMsg("bad", "Game Over 🥺🥺");
        upcomingWords.remove();
        saveToStorage();
      }
    }
  }, 1000);

  first = false;
}

function finisingMsg(name, msg) {
  const span = document.createElement("span");
  span.className = name;
  let spanText = document.createTextNode(msg);
  span.appendChild(spanText);
  finishMessage.appendChild(span);
}

// [x] save score to local storage with today date
// [x] choose levels from select box
// [x] break the logic with more functions
// [x] choose arr of words for every lvl  4/ 7/...
// [x] write game instruction by js Dynamically

window.onload = () => {
  getObjFromStorage();
  instructions();

  if (localStorage.length) showPerviousScore();
};

function saveToStorage() {
  localStorage.setItem(
    "score",
    JSON.stringify({
      date: new Date(Date.now()).toLocaleString(),
      score: scoreGot.innerHTML,
    })
  );

  modifyPerviousScore();
}

function getObjFromStorage() {
  return localStorage.getItem("score");
}

function showPerviousScore() {
  const scoreSpan = document.createElement("span"),
    dateDiv = document.createElement("div");

  scoreSpan.setAttribute("id", "prev-span"),
    dateDiv.setAttribute("id", "prev-div");

  // assign the fields after the finish message
  finishMessage.after(scoreSpan);
  scoreSpan.after(dateDiv);

  // get previous score from storage and put em inside fields
  modifyPerviousScore();
}

// [x] make prev fields dont repeat themseleves on win/loss
function modifyPerviousScore() {
  // get previous score from storage and put em inside fields
  document.getElementById(
    "prev-span"
  ).textContent = `Your Pervious Score: ${
    JSON.parse(getObjFromStorage()).score
  }`;

  document.getElementById(
    "prev-div"
  ).textContent = `Was Scored at: ${
    JSON.parse(getObjFromStorage()).date
  }`;
}

// Adjust Array of words depends on the diffcult
function AdjustArrDiff(diff) {
  if (diff === "Easy")
    return words.filter((w) => w.length < 4);
  else if (diff === "Normal")
    return words.filter(
      (w) => w.length >= 4 && w.length < 8
    );
  else return words.filter((w) => w.length >= 8);
}

// instruction div
function instructions() {
  const div = document.createElement("div"),
    h2 = document.createElement("h2"),
    p = document.createElement("p"),
    p2 = document.createElement("p"),
    span = document.createElement("span");

  div.className = `inst`;

  div.append(h2, p, p2, span);
  finishMessage.after(div);
  modifyInstructions();
}

function modifyInstructions() {
  (document.querySelector(
    ".inst h2"
  ).textContent = `Game Instructions:`),
    (document.querySelector(
      ".inst p:first-of-type"
    ).textContent = `You Are Playing On ${defualtLvlName} Difficulty.`),
    (document.querySelector(
      ".inst p:last-of-type"
    ).textContent = `You have ${defualtLvlSeconds} seconds to type the shown word.`),
    (document.querySelector(
      ".inst span"
    ).textContent = `Good Luck!!`);
}
