const btns = document.querySelector(".buttons"),
  results = document.querySelector(".results > span"),
  theInput = document.getElementById("the-input");

btns.addEventListener("click", (e) => {
  if (e.target.classList.contains("check-item")) {
    checkItem();
  } else if (e.target.classList.contains("add-item")) {
    addItem();
  } else if (e.target.classList.contains("delete-item")) {
    deleteItem();
  } else if (e.target.classList.contains("show-items")) {
    showItem();
  }
});

function showMsgEmptyInp() {
  results.textContent = `Please, fill the input field!`;
}

function checkItem() {
  if (theInput.value) {
    if (localStorage.getItem(theInput.value))
      results.innerHTML = `Found localStorage Item called <span>${theInput.value}</span>`;
    else
      results.innerHTML = `No localStorage Item found called <span>${theInput.value}</span>`;
  } else {
    showMsgEmptyInp();
  }
}

// [ ] add second input to add keyValue
function addItem() {
  if (theInput.value) {
    localStorage.setItem(theInput.value, "test");
    results.innerHTML = ` localStorage Item Added called <span>${theInput.value}</span>`;
  } else {
    showMsgEmptyInp();
  }
}

function deleteItem() {
  if (theInput.value) {
    if (theInput.value in localStorage) {
      localStorage.removeItem(theInput.value);
      results.innerHTML = ` localStorage Item deleted called <span>${theInput.value}</span>`;
    } else {
      results.innerHTML = `No localStorage Item found called <span>${theInput.value}</span>`;
    }
  } else {
    showMsgEmptyInp();
  }
}

function showItem() {
  if (localStorage.length) {
    results.innerHTML = ``;
    for (let [key, value] of Object.entries(localStorage)) {
      const div = document.createElement("div");
      (div.classList = `keys`),
        (div.textContent = `${key}`);

      results.appendChild(div);
    }
  }
}
