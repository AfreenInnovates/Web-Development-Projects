import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://pantry-app-bc112-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const userId = localStorage.getItem("userId") || crypto.randomUUID();
localStorage.setItem("userId", userId);
const shoppingItemsDB = ref(database, `users/${userId}/shoppingItems`);

const inputText = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const shoppingUl = document.getElementById("shopping-list");

function showToast(message, type) {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.getElementById("toast-container").appendChild(toast);

  // Remove the toast after animation completes
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

addButton.addEventListener("click", function () {
  let inputValue = inputText.value.trim();
  if (inputValue === "") {
    alert("Please enter an item.");
    return;
  }

  push(shoppingItemsDB, inputValue);
  showToast(`Added item: ${inputValue}`, "success");
  inputText.value = "";
});

onValue(shoppingItemsDB, function (snapshot) {
  shoppingUl.innerHTML = "";

  if (snapshot.exists()) {
    const itemsObject = snapshot.val();
    const itemsArray = Object.entries(itemsObject);

    console.log("Shopping Items:", itemsArray);

    itemsArray.forEach(([key, item]) => {
      let newListItem = document.createElement("li");
      newListItem.textContent = item;

      newListItem.addEventListener("click", function () {
        const exactLocationOfItemInDB = ref(
          database,
          `users/${userId}/shoppingItems/${key}`
        );
        remove(exactLocationOfItemInDB);
        showToast(`Removed item: ${item}`, "error");
      });

      shoppingUl.appendChild(newListItem);
    });
  } else {
    console.log("No items in the shopping list.");
  }
});
