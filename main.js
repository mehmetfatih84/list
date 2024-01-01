const alert = document.querySelector(".alert"),
  inputArea = document.querySelector(".input-area"),
  submitButton = document.querySelector(".submit-button"),
  content = document.querySelector(".content"),
  listContent = document.querySelector(".list-content"),
  titleArea = document.querySelector("title-area"),
  clearButton = document.querySelector(".clear-button");

submitButton.addEventListener("click", dataSubmit);
clearButton.addEventListener("click", deleteButton);
document.addEventListener("DOMContentLoaded", onFocus);

//input alanında veri yazdırma
function dataSubmit() {
  if (inputArea.value.trim() === "") {
    addClass("Input is empty", "alert-danger");
    return; 
  }
  addClass();
  pElement();
  inputArea.value = ""; // Clear the input area
}

//input alanına focus
function onFocus() {
  inputArea.focus();
}
//alert oluşturma
function addClass(title, className) {
  alert.textContent = title;
  alert.classList.add(className);
  setTimeout(() => {
    alert.classList.remove(className);
  }, 1500);
}


// Liste Elemanı Oluşturma
function pElement() {
  const text = inputArea.value;
  const newDiv = document.createElement("div");
  newDiv.classList.add("list-area");
  newDiv.innerHTML = `<div class="list-area">
    <p class="title-area">${text}</p>
    <div class="list-icon">
      <i class="fa-solid fa-trash delete-button"></i>
      <i class="fa-solid fa-pen-to-square edit-button"></i>
    </div>
  </div>`;
  const id = new Date().getTime().toString();
  id.value = "data-id";
  newDiv.classList.add("data-id");
  const dataInfo = { id, text };
  console.log(dataInfo);
  listContent.appendChild(newDiv);

  const deleteElementBtn = newDiv.querySelector(".delete-button");
  deleteElementBtn.addEventListener("click", () => {
    localStorage.removeItem(id);
    deleteElement();
  });

  const editElementBtn = newDiv.querySelector(".edit-button");
  editElementBtn.addEventListener("click", () => {
    editElement(newDiv, id, text);
  });

  addClass("Successful", "alert-successful");
  toLocalStorage(id, dataInfo);
}

// Listeden Elemanı Düzenleme
function editElement(element, id, text) {
  // Create an input field
  const input = document.createElement("input");
  input.type = "text";
  input.value = text;
  input.id = "edit-input"; 

  const titleArea = element.querySelector(".title-area");
  titleArea.textContent = "";
  titleArea.appendChild(input);

  const editButton = element.querySelector(".edit-button");
  editButton.classList.remove("fa-pen-to-square");
  editButton.classList.add("fa-save");

  editButton.addEventListener("click", () => {
    const newText = input.value;
    titleArea.textContent = newText;

    const oldData = JSON.parse(localStorage.getItem(id)) || [];
    const newData = { id, text: newText };
    const updatedData = oldData.map(item => (item.id === id ? newData : item));
    localStorage.setItem(id, JSON.stringify(updatedData));

    editButton.classList.remove("fa-save");
    editButton.classList.add("fa-pen-to-square");
  });
}

//Listeden Eleman Silme
function deleteElement() {
  const listArea = listContent.querySelector(".list-area");
  listArea.remove();
  addClass("Delete", "alert-danger");
}

//Clear Button
function deleteButton() {
  if (listContent != "") {
    listContent.remove();
  }
  addClass("Clear", "alert-danger");
  localStorage.clear();
}

function toLocalStorage(key, value) {
  const oldData = JSON.parse(localStorage.getItem(key)) || [];
  oldData.push(value);
  localStorage.setItem(key, JSON.stringify(oldData));
}
const handleEnter = (e) => {
  if (e.code == "Enter") {
    dataSubmit();
  }
};
inputArea.addEventListener("keyup", handleEnter);

