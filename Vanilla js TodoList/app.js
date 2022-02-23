const theInput = document.querySelector(".add-task input"),
  AddBtn = document.querySelector(".add-task .plus"),
  tasksContainer = document.querySelector(".tasks-content"),
  tasksCount = document.querySelector(".task-count span"),
  tasksCompleted = document.querySelector(
    ".task-completed span"
  );
let tasks = [],
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
// FIXME No tasks MSG onload

function removeNoTaskMsg() {
  if (
    document.body.contains(
      document.querySelector(".no-tasks-msg")
    )
  ) {
    // remove noTasksMsg Div
    document.querySelector(".no-tasks-msg").remove();
  }
}

// create tasks container function

function createTasksContainer() {
  removeNoTaskMsg();

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

function create(taskTitle, taskStatus) {
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

  if (taskStatus) mainSpan.className = "task-box done";

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

  changeTaskColor(mainSpan);

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
// [x] remove from storage
function deleteFunction(delBtn) {
  delBtn.parentElement.remove();

  if (tasksContainer.childElementCount === 0)
    createNoTasksMSG();

  // Remove element from array by value
  tasks.splice(
    tasks.indexOf(delBtn.parentElement.textContent),
    1
  );

  // LocalStorage Manipulation

  console.log(localArr);
  localArr.forEach((t) => {
    if (
      t.title ===
      delBtn.parentElement.textContent.replace(
        /delete$/i,
        ""
      )
    )
      localArr.splice(localArr.indexOf(t), 1);
  });

  storeTasks(localArr);

  countTasks();
}

function deleteAll() {
  localStorage.clear();

  while (tasksContainer.firstChild) {
    tasksContainer.firstChild.remove();
  }
  createNoTasksMSG();

  (tasks = []), (localArr = []);
  countTasks();
}

// doneFunction on click mainSpan
function doneFunction(mainSpan) {
  let titleExtract = mainSpan.textContent.replace(
    /delete$/i,
    ""
  );

  mainSpan.classList.toggle("done");

  mainSpan.classList.contains("done")
    ? doneTasksArr.push(titleExtract)
    : doneTasksArr.splice(
        doneTasksArr.indexOf(titleExtract),
        1
      );

  // localStorage Manipulation
  localArr.forEach((t) => {
    if (t.title === titleExtract) t.status = !t.status;
  });
  storeTasks(localArr);

  countTasks();
}

function finishAll() {
  Array.from(tasksContainer.children).map((node) => {
    if (!node.classList.contains("done"))
      node.classList.add("done");
  });

  // localStorage Manipulation
  localArr.forEach((t) => (t.status = true));
  storeTasks(localArr);

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

// Count all tasks
function countTasks() {
  tasksCount.textContent = document.querySelectorAll(
    ".tasks-content .task-box"
  ).length;

  // Count completed tasks
  tasksCompleted.textContent = document.querySelectorAll(
    ".tasks-content .done"
  ).length;
}

// [x] add tasks to local storage
function addTasksToLocalStorage(task) {
  let tasksObj = {
    id: Math.random().toString(36).slice(2, 5),
    title: task,
    status: false,
    color: "",
  };

  localArr.push(tasksObj);

  storeTasks(localArr);
}

function storeTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// [x] get tasks storage , then put em in page
// [x] edit status in the localstorage & keep it
window.onload = () => {
  if (localStorage.length != 0) {
    localArr = JSON.parse(localStorage.getItem("tasks"));

    localArr.forEach((task) => {
      create(task.title, task.status);
    });
  }

  // only if the container has childern ..'NoMsg' Appears!!
  if (
    document.querySelectorAll(".tasks-content .task-box")
      .length > 0
  ) {
    removeNoTaskMsg(), createShortCutsDiv();
  }
};

// array of Colors
const arrOfColors = [
  "#61C284",
  "#C2E975",
  "#e91e63",
  "#ffc107",
  "#1F78C1",
  "#7163B4",
  "#9D4993",
  "#8D6D88",
  "#ff9800",
  "#e91e63",
  "#344B47",
  "#FFA17A",
  "#00372E",
];

function changeTaskColor(taskBox) {
  // [x] set color in the localArr .. storage

  localArr.forEach((t) => {
    t.color = `${
      arrOfColors[
        Math.trunc(Math.random() * arrOfColors.length - 1)
      ]
    }`;

    if (
      taskBox.textContent.replace(/delete$/i, "") ===
      t.title
    ) {
      taskBox.style.color = t.color;
    }
  });
  storeTasks(localArr);

  // [x] get the color from the storage to each one
}

//  [ ] make the color dont randomly on each load
