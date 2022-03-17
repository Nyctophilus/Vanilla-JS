const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// select elements
const lettersContainer = document.querySelector(".letters"),
  fragment = document.createDocumentFragment();

// Generate Letters
lettersArray.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");

  // Create Letter Text Node
  let theLetter = document.createTextNode(letter);

  // Append The Letter To Span
  span.appendChild(theLetter);

  // Add Class On Span
  span.className = "letter-box";

  // Append Span To The Letters Container
  fragment.appendChild(span);
});

lettersContainer.appendChild(fragment);

// Object Of Words + Categories
const words = {
  programming: [
    "javascript",
    "go",
    "scala",
    "php",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Cleopatra",
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Mahatma Ghandi",
  ],
  countries: [
    "Egypt",
    "Palestine",
    "Syria",
    "Yemen",
    "Bahrain",
    "Qatar",
  ],
};

// Get Random Catogery
let randomCatotgery =
  Object.keys(words)[
    Math.trunc(Math.random() * Object.keys(words).length)
  ];

// Get Random Cat-value
let randomCatogeryValue =
  words[randomCatotgery][
    Math.trunc(
      Math.random() * words[randomCatotgery].length
    )
  ];

// Set Category Info
document.querySelector(
  ".game-info .category span"
).textContent = randomCatotgery;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(
  ".letters-guess"
);

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomCatogeryValue);

// Create Spans Depened On Word
lettersAndSpace.forEach((letter) => {
  // Create Empty Span
  let emptySpan = document.createElement("span");

  // If Letter Is Space
  if (letter === " ") {
    // Add Class To The Span
    emptySpan.className = "with-space";
  }

  // Append Span To The Letters Guess Container
  fragment.appendChild(emptySpan);
});

lettersGuessContainer.appendChild(fragment);

// Select Guess Spans
let guessSpans = document.querySelectorAll(
  ".letters-guess span"
);

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  // Set The Choose Status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // The Chosen Word
    let theChosenWord = Array.from(
      randomCatogeryValue.toLowerCase()
    );

    theChosenWord.forEach((wordLetter, WordIndex) => {
      // If The Clicked Letter Equal To One Of The Chosen Word Letter
      if (theClickedLetter == wordLetter) {
        // Set Status To Correct
        theStatus = true;

        // Loop On All Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (WordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });

    // If Letter Is Wrong
    if (theStatus !== true) {
      // Increase The Wrong Attempts
      wrongAttempts++;

      // Add Class Wrong On The Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // Play Fail Sound
      //   document.getElementById("fail").play();

      if (wrongAttempts === 8) {
        endGame();

        lettersContainer.classList.add("finished");
      }
    } else {
      // Play Success Sound
      //   document.getElementById("success").play();
    }
  }
});

// End Game Function
function endGame() {
  // Create Popup Div
  let div = document.createElement("div");

  // Create Text
  let divText = document.createTextNode(
    `Game Over, The Word Is ${randomCatogeryValue}`
  );

  // Append Text To Div
  div.appendChild(divText);

  // Add Class On Div
  div.className = "popup";

  // Append To The Body
  document.body.appendChild(div);
}

// [ ] add congratz func with num of wrong attemps
// [ ] instead of words object, MAKE JSON file and fetch it
