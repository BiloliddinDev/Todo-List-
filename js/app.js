const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
// const messageCreate = document.getElementById("message-create");
const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
/* time elements */
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const closeEl = document.getElementById("close");

let editItemId;

let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

if (todos.length) showCasa();

function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

function gettime() {
  const now = new Date();
  const data = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const mon = now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
  const year = now.getFullYear();
  const sogot = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const min = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const sek =
    now.getSeconds() < 10 ? "0" + (now.getSeconds() + 1) : now.getSeconds();
  const oylar = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyul",
    "Iyun",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];
  const monTitle = now.getMonth();
  fullDay.textContent = `${data} ${oylar[monTitle]} ${year} `;
  hourEl.textContent = sogot;
  minuteEl.textContent = min;
  secondEl.textContent = sek;
  return ` ${sogot}:${min}.${mon}.${year}`;
}
setInterval(gettime, 1000);

function showCasa() {
  const todos = JSON.parse(localStorage.getItem("list"));
  listGroupTodo.innerHTML = ``;
  todos.forEach((item, i) => {
    listGroupTodo.innerHTML += `
    <li   ondblclick='setComplate(${i})'
          class="list-group-item ${
            item.complated == true ? "complated" : ""
          } d-flex align-items-center justify-content-between"
        >
            ${item.text}          
          <div class="todo-icons">
            <span class="opacity-50 me-2">${item.time}</span>
            <img onclick=(editTode(${i})) src="./img/edit.svg" alt="Nimadir" width="25" height="25" />
            <img onclick=(deleteTodo(${i})) src="./img/delete.svg" alt="Nimadir" width="25" height="25" />
          </div>
        </li>
    `;
  });
}

function showMasenge(qayerga, sms) {
  document.getElementById(`${qayerga}`).textContent = sms;

  setTimeout(() => {
    document.getElementById(`${qayerga}`).textContent = "";
  }, 2000);
}

formCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputText = formCreate["input-create"].value.trim();
  formCreate.reset();
  if (inputText.length) {
    todos.push({
      text: inputText,
      time: gettime(),
      complated: false,
    });
    setTodos();
    showCasa();
  } else {
    showMasenge("message-create", "Iltmos Malumot Kirting...");
  }
});

// deletee

function deleteTodo(id) {
  const deleteTodos = todos.filter((item, i) => {
    return i !== id;
  });
  todos = deleteTodos;
  setTodos();
  showCasa();
}

// complate

function setComplate(id) {
  const complateTodos = todos.map((item, i) => {
    if (id == i) {
      return { ...item, complated: item.complated == true ? false : true };
    } else {
      return { ...item };
    }
  });
  todos = complateTodos;
  setTodos();
  showCasa();
}

//edit form

formEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputText = formEdit["input-edit"].value.trim();
  formEdit.reset();
  if (inputText.length) {
    todos.splice(editItemId, 1, {
      text: inputText,
      time: gettime(),
      complated: false,
    });
    setTodos();
    showCasa();
    clos();
  } else {
    showMasenge("message-edit", "Iltmos Malumot Kirting...");
  }
});

//editTodo

function editTode(id) {
  Open();
  editItemId = id;
}

// Opne
function Open() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
function clos() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

overlay.addEventListener("click", clos);
closeEl.addEventListener("click", clos);

document.addEventListener("keydown", (e) => {
  if (e.which == 27) {
    clos();
  }
});
