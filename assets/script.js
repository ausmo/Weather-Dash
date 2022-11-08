let apiKey = "7fbacaf5493a39dce8d922ade258bf98";
let searchInput = document.querySelector("#searchInput");
let button = document.querySelector("#searchButton");
let storage = JSON.parse(localStorage.getItem("citySearchHistory")) || [];

function handleFormSubmit(event) {
  event.preventDefault();

  let userInput = searchInput.value.trim();

  getWeatherdata(userInput);

  storage.push(userInput);

  localStorage.setItem("citySearchHistory", JSON.stringify(storage));

  let listEl = document.createElement("li");

  listEl.textContent = userInput;

  listEl.setAttribute("id", "searchHistory");

  let showHistory = document.getElementById("showHistory");

  showHistory.appendChild(listEl);

  let liButton = document.getElementById("searchHistory");

  liButton.onclick = SearchHistorySearch;
}
