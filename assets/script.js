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

function SearchHistorySearch(){
    if (storage.length > 0) {
        getWeatherdata(storage[storage.length - 1]);
    }
    }

    button.addEventListener("click", handleFormSubmit)
    function getWeatherdata(userInput) {
    //this api gets Lat and long data
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=${apiKey}`)
            .then(function (response) {
                return response.json()
    
            })
            .then(function (cityData) {
    
                console.log(cityData[0].lat);
                console.log(cityData[0].lon);
                return { lat: cityData[0].lat, lon: cityData[0].lon }
    
            })
            
            .then(function (latLonData) {
                return fetch(`https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${latLonData.lat}&lon=${latLonData.lon}&appid=${apiKey}`)
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (data) {
                        const weatherInfo = data
                        const weatherArray = []
                        for (let i = 0; i < weatherInfo.list.length; i += 7) {
    
                            weatherArray.push(weatherInfo.list[i])
    
                        }