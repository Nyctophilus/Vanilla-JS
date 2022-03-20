const countSpan = selector(".quiz-info .count span"),
  bulletSpans = selector(".bullets .spans"),
  quizArea = selector(".quiz-area"),
  answersArea = selector(".answers-area"),
  submiteBtn = selector(".submit-button"),
  bullets = selector(".bullets"),
  countdownElement = selector(".countdown"),
  fragment = document.createDocumentFragment();
let theResults = selector(".results");

// helper functions
function selector(sel) {
  return document.querySelector(sel);
}
function g_Selector(sel) {
  return document.querySelectorAll(sel);
}

// Options
let currentQ = 0, //current question
  rightAnswersCount = 0,
  countdownInterval;

// ajax get questions
function getQuestions() {
  const req = new XMLHttpRequest();

  req.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questions = JSON.parse(this.responseText),
        qCount = questions.length;
      console.log(questions);

      createBullets(qCount);

      addQsData(questions[currentQ], qCount);

      //   start count down
      countdown(3, qCount);

      //  on click submit
      submiteBtn.onclick = () => {
        // check if the selected answer is the right one
        checkAnswer(
          questions[currentQ].right_answer,
          qCount
        );
        currentQ++;
        // show next question
        clean();
        addQsData(questions[currentQ], qCount);

        // handle bullets classes
        bulletsClass(qCount);

        // clear then start new countDown
        clearInterval(countdownInterval);
        countdown(3, qCount);

        // show results
        showResults(qCount);
      };
    }
  };

  req.open("GET", "html_questions.json", true);
  req.send();
}
getQuestions();

// create bullets
function createBullets(count) {
  countSpan.textContent = count;

  // create spans
  for (let i = 0; i < count; i++) {
    const bullet = document.createElement("span");

    if (i === 0) bullet.classList.add("on");

    fragment.appendChild(bullet);
  }

  bulletSpans.appendChild(fragment);
}

// add Questions to the page
function addQsData(question, count) {
  if (currentQ < count) {
    const QuestionTitle = document.createElement("h2"),
      QuestionText = document.createTextNode(
        question.title
      );

    QuestionTitle.appendChild(QuestionText);

    quizArea.appendChild(QuestionTitle);

    // Create The Answers
    for (let i = 1; i <= 4; i++) {
      // Create Main Answer Div
      const mainDiv = document.createElement("div");

      // Add Class To Main Div
      mainDiv.classList.add("answer");

      // Create Radio Input
      const radioInput = document.createElement("input");

      // Add Type + Name + Id + Data-Attribute
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = question[`answer_${i}`];

      // Make First Option Selected
      if (i === 1) {
        radioInput.checked = true;
      }

      // Create Label
      let theLabel = document.createElement("label");

      // Add For Attribute in Label
      theLabel.htmlFor = `answer_${i}`;

      // Create Label Text
      let theLabelText = document.createTextNode(
        question[`answer_${i}`]
      );

      // Add The Text To Label
      theLabel.appendChild(theLabelText);

      // Add Input + Label To Main Div
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);

      fragment.appendChild(mainDiv);

      // Append All Divs To Answers Area
      answersArea.appendChild(fragment);
    }
  }
}

// check answers
function checkAnswer(rightAnswer, count) {
  const answers = document.getElementsByName("question");
  for (ans of answers) {
    if (ans.checked && ans.dataset.answer === rightAnswer) {
      console.log(`Bravoooooooooo!`);
      rightAnswersCount++;
      console.log(`right attempts: ${rightAnswersCount}`);
    }
  }
}

// clean function
function clean() {
  (quizArea.innerHTML = ""), (answersArea.innerHTML = "");
}

// bullets class function
function bulletsClass(count) {
  if (currentQ < count) {
    // bulletSpans.children[
    //   currentQ
    // ].previousSibling.classList.remove("on");

    bulletSpans.children[currentQ].classList.add("on");
  }
}

// show results
function showResults(count) {
  if (currentQ === count) {
    answersArea.remove();
    quizArea.remove();
    submiteBtn.remove();
    bullets.remove();

    if (
      rightAnswersCount > count / 2 &&
      rightAnswersCount < count
    ) {
      theResults.innerHTML = `<span class="good">Good</span>, ${rightAnswersCount} outta ${count}`;
    } else if (rightAnswersCount === count) {
      theResults.innerHTML = `<span class="perfect">Perfect</span>, Prefectly Done!🤩`;
    } else {
      theResults.innerHTML = `<span class="bad">Bad</span>, ${rightAnswersCount} outta ${count}`;
    }
  }
}

function countdown(duration, count) {
  if (currentQ < count) {
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countdownElement.innerHTML = `${minutes}:${seconds}`;

      if (--duration < 0) {
        clearInterval(countdownInterval);
        submiteBtn.click();
      }
    }, 1000);
  }
}
