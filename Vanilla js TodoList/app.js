let theInput = document.querySelector(".add-task input"),
  AddBtn = document.querySelector(".add-task .plus"),
  tasksContainer = document.querySelector(".tasks-content"),
  tasksCount = document.querySelector(".task-count span"),
  tasksCompleted = document.querySelector(
    ".task-completed span"
  ),
  tasks = [],
  doneTasksArr = [],
  localArr = [],
  iTask = 0;

//   Focus on input field
window.onload = () => {
  theInput.focus();
};

//   ---- Triggers
// adding tasks
AddBtn.onclick = onClickFunc;
// on enter press
theInput.addEventListener("keyup", (e) => {
  //e.keyCode === 13
  if (e.key === "Enter") {
    onClickFunc();
  }
});

// onclick func
function onClickFunc() {
  // [x]if input is empty ... add sweet alert 'You have to write a task in the field'

  if (!theInput.value) {
    sweetAlertFunc(
      "Common!",
      "You have to write a task in the field!",
      "warning",
      "Aww I'll try!"
    );
  }
  //[x] if input value = any of textNodes of the pervious tasks --> Sweet Alert
  else if (tasks.includes(theInput.value)) {
    sweetAlertFunc(
      "repeated!",
      "You can't add the same task over and over again!",
      "error",
      "Oh I'll try other!"
    );
  }
  //   input is valid
  else {
    createTasksContainer();
  }
}

// create tasks container function
// FIXME No tasks MSG onload

function createTasksContainer() {
  if (
    document.body.contains(
      document.querySelector(".no-tasks-msg")
    )
  ) {
    // remove noTasksMsg Div
    document.querySelector(".no-tasks-msg").remove();
  }

  if (!executed) {
    // Create shortcuts div
    createShortCutsDiv();
  }

  // pass input value to storage
  addTasksToLocalStorage(theInput.value);

  create(theInput.value);

  // Empty the input empty
  (theInput.value = ""), theInput.focus();
}

function create(taskTitle) {
  // create span & deleteBtn
  let mainSpan = document.createElement("span"),
    delBtn = document.createElement("span"),
    //   create text node
    text = document.createTextNode(`${taskTitle}`),
    delText = document.createTextNode(`Delete`);

  //   add text spans
  mainSpan.appendChild(text), delBtn.appendChild(delText);

  // add classes to spans
  (mainSpan.className = "task-box"),
    (delBtn.className = "delete");

  //   add delete Btn
  mainSpan.appendChild(delBtn),
    // add the task 'mainSpan' to the container
    tasksContainer.appendChild(mainSpan);

  // fill tasks Array
  tasks.push(text.textContent);

  // click events
  document.addEventListener("click", (e) => {
    if (e.target === delBtn) deleteFunction(delBtn);
    else if (e.target === mainSpan) doneFunction(mainSpan);
  });

  countTasks();
}

// Sweet Alert
function sweetAlertFunc(title, text, icon, button) {
  swal({
    title: title,
    text: text,
    icon: icon,
    button: button,
  });
}

// delete function on click delBtn
// other way docment.addEventListener
function deleteFunction(delBtn) {
  delBtn.parentElement.remove();

  if (tasksContainer.childElementCount === 0)
    createNoTasksMSG();

  // Remove element from array by value
  tasks.splice(
    tasks.indexOf(delBtn.parentElement.textContent),
    1
  );

  countTasks();
}

// doneFunction on click mainSpan
function doneFunction(mainSpan) {
  mainSpan.classList.toggle("done");

  // [ ] search for task in storage by value which has done class... then edit its status to true
  mainSpan.classList.contains("done")
    ? doneTasksArr.push(
        mainSpan.textContent.replace(/delete$/i, "")
      )
    : doneTasksArr.splice(
        doneTasksArr.indexOf(
          mainSpan.textContent.replace(/delete$/i, "")
        ),
        1
      );

  // console.log(doneTasks);
  // change Completed tasks counter
  countTasks();
}

// [x] shortcuts creation function
let executed = false;
function createShortCutsDiv() {
  let shorts = document.createElement("span"),
    d = document.createElement("span"),
    f = document.createElement("span"),
    dtext = document.createTextNode("delete all"),
    ftext = document.createTextNode("finish all");

  d.appendChild(dtext), f.appendChild(ftext);

  f.className = "f";

  shorts.append(d, f), (shorts.className = "shortcuts");

  tasksContainer.before(shorts);

  executed = true;
}

// click events
document.addEventListener("click", (e) => {
  if (
    e.target ===
    document.querySelector(".shortcuts span:first-child ")
  )
    deleteAll();
  else if (
    e.target ===
    document.querySelector(".shortcuts span.f ")
  )
    finishAll();
});

function deleteAll() {
  while (tasksContainer.firstChild) {
    tasksContainer.firstChild.remove();
  }
  createNoTasksMSG();

  tasks = [];
  countTasks();
}

function finishAll() {
  Array.from(tasksContainer.children).map((node, i) => {
    node.classList.toggle("done");
  });

  countTasks();
}

// Function To Create No Tasks Message
function createNoTasksMSG() {
  // Create Message Span Element
  let msgSpan = document.createElement("span");
  // Create The Text Message
  let msgText = document.createTextNode("No Tasks To Show");
  //Add Text To Message Span Element
  msgSpan.appendChild(msgText);
  // Add Class To Message Span
  msgSpan.className = "no-tasks-msg";
  // Append The Message Span Element To The Task Container
  tasksContainer.appendChild(msgSpan);
}

// Count the completed tasks
function countTasks() {
  tasksCount.textContent = document.querySelectorAll(
    ".tasks-content .task-box"
  ).length;

  // Count all tasks
  tasksCompleted.textContent = document.querySelectorAll(
    ".tasks-content .done"
  ).length;
}

// [x] add tasks to local storage

function addTasksToLocalStorage(task) {
  let tasksObj = {
    id: iTask,
    title: task,
    status: false,
  };

  iTask++;

  localArr.push(tasksObj);

  storeTasks(localArr);
}

function storeTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// [x] get tasks storage , then put em in page
// [ ] edit status in the localstorage & keep it
window.onload = () => {
  if (localStorage.length != 0) {
    localArr = JSON.parse(localStorage.getItem("tasks"));

    console.log(localArr);
    localArr.forEach((task) => {
      create(task.title);
    });
  }
};
