//  !Choose elements


let todoForm = document.getElementById("todo-form");

let todoInput = document.getElementById("todo");

let uniqueButton = document.getElementById("unique");

let cardBodyOne = document.querySelectorAll(".card-body")[0];

let cardBodyTwo = document.querySelectorAll(".card-body")[1];

let listGroup = document.querySelector(".list-group");

let filter = document.getElementById("filter");

let allTodos = document.getElementById("clear-todos");

let listitem = document.querySelectorAll(".list-group-item");

let fa = document.getElementById("fa");

// !addEventListener
addEventListener();

function addEventListener() {

  todoForm.addEventListener("submit", formValidation);

  cardBodyTwo.addEventListener("click", deleteTodosFromUIStorage);

  filter.addEventListener("keyup", filterTodos);

  allTodos.addEventListener("click", deleteAllTodos);
}


// !formValidation
function formValidation(e) {
  let newTodo = todoInput.value.trim();


  if (newTodo === "") {
    displayMessage("danger", "Please add todo");
  }
  
  else {
    setStorage(newTodo);
  }

  e.preventDefault();

}


// !displayMessage
function displayMessage(type, message) {

  let div = document.createElement("div");

  div.className = `alert alert-${type}`;

  div.textContent = message;

  cardBodyOne.appendChild(div);

  setTimeout(function () {
    div.remove();
  }, 2000);
  todoInput.value = "";
}


// ! getStorage
function getStorage() {

  let todos;

  if (localStorage.getItem("key") === null) {
    todos = [];
  }

  else {
    todos = JSON.parse(localStorage.getItem("key"));
  }
  return todos;

}

// !setStorage
function setStorage(paramsTodo) {

  let todos = getStorage();

  let m = todos.includes(paramsTodo)

  if (m) {
    displayMessage("primary", `${paramsTodo} bunnan var`);
  }

  else {
    todos.push(paramsTodo);
    localStorage.setItem("key", JSON.stringify(todos));
    addUI(paramsTodo);
    displayMessage("primary", `${paramsTodo} added`);
  }
}

// !addUI
function addUI(paramsTodo) {

  if (paramsTodo !== listGroup.firstElementChild) {

    listGroup.innerHTML += `
      <li class="list-group-item   d-flex justify-content-between">
              ${paramsTodo}
              <a href="#" class="delete-item">
                <i id="fa" class="fa fa-remove"></i>
              </a>
            </li>

            
    `;
  }
}



// !deleteTodosFromUIStorage
function deleteTodosFromUIStorage(e) {

  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
  }

  let clickText = e.target.parentElement.parentElement.textContent.trim();
  deleteStorage(clickText);
}


// !deleteStorage
function deleteStorage(clickText) {

  let arr = getStorage();

  arr.forEach(function (item, index) {
    if (item === clickText) {
      arr.splice(index, 1);
    }
  });

  localStorage.setItem("key", JSON.stringify(arr))


}

// !filterTodos
function filterTodos() {

  let searched = filter.value.toLowerCase();
  let lists = document.querySelectorAll(".list-group-item");

  lists.forEach(item => {
    let itemText = item.textContent.toLowerCase();
    if (itemText.indexOf(searched) === -1) {
      item.setAttribute("style", "display:none !important");
    }

    else {
      item.setAttribute("style", "display:block");
    }
  });
}


// !deleteAllTodos
function deleteAllTodos() {
  if (localStorage.length > 0) {
    if (confirm("Eminsenmi silmeye ?")) {

      while (listGroup.firstElementChild !== null) {
        listGroup.removeChild(listGroup.firstElementChild);
      }

      displayMessage("danger", `${getStorage().length} mehsul silindi`);
      localStorage.clear();
    }

    else {
      displayMessage(
        "primary",
        `${getStorage().length} sayda mehsul bazada qaldi`
      );
    }

  } else {
    displayMessage("warning", "Silmeye hecne yoxdur");
  }
}



















