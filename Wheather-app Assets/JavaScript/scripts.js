let inputEl = document.getElementById("SearchedInput");
console.log(inputEl);
const searchBtn = document.getElementById("searchB");
let textInput;
let locationT = document.querySelector(".locationMB");
let tempT = document.querySelector("#temp-1");
let windT = document.querySelector("#wind-1");
let humT = document.querySelector("#hum-1");
let todayEl = document.querySelector(".date-1");
// this is my api key
var apiKey = "1a45efe26fcd22bc0f8b0c1730851d56";
// city variable
var city;
function setInput() {
  window.localStorage.setItem(textInput);
}
//current date here
let currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();
//current date here
displayCurrentDay();
function displayCurrentDay() {
  let today = cDay + "/" + cMonth + "/" + cYear;
  console.log(today);
  todayEl.innerText = today;
}

function fetchweather(city) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      apiKey
  )
    .then((res) => res.json())
    .then((data) => {
      let name = data.name;
      let temp = data.main.temp;
      let wind = data.wind.speed;
      let humidity = data.main.humidity;
      console.log(data);
      locationT.innerText = name;
      tempT.innerText = "Temp: " + temp + " °F";
      windT.innerText = "Wind: " + wind + "MPH";
      humT.innerText = "Humidity: " + humidity + "%";

      //do forloop here
      // document.querySelector(".locationMB").innerText = name;
      // document.querySelector(".temp-1").innerText = temp;
      // document.querySelector(".wind-1").innerText = wind;
      // document.querySelector(".hum-1").innerText = humidity;
    });
}

displayPreviousSearches();
//event listener to for searches
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e);
  saveCity();

  //below is the code to link button click to the fetch code.

  // location.reload();
});

//save searches funcion
function saveCity() {
  var searchedCity = inputEl.value;

  if (searchedCity !== "") {
    var cityNames = JSON.parse(window.localStorage.getItem("cityNames")) || [];
    console.log(cityNames);
    // if (searchedCity is  already in array dont push ) {

    // } else
    cityNames.push(searchedCity);

    window.localStorage.setItem("cityNames", JSON.stringify(cityNames));
    console.log("b" + cityNames);
  }

  location.reload();
}

//display previous searched as buttons function
function displayPreviousSearches() {
  var cityNameBtns = JSON.parse(window.localStorage.getItem("cityNames")) || [];

  for (let cities = cityNameBtns.length - 1; cities > 0; cities--) {
    let currentCity = cityNameBtns[cities];
    console.log(currentCity);
    var ulTag = document.getElementById("buttonUl");

    var liTag = document.createElement("li");
    var cityBtn = document.createElement("button");
    cityBtn.innerText = currentCity;
    cityBtn.setAttribute("id", currentCity);
    cityBtn.setAttribute("class", "cityButtons");
    console.log(cityNameBtns[cities]);
    liTag.appendChild(cityBtn);

    ulTag.appendChild(liTag);
  }
  fetchweather(cityNameBtns[cityNameBtns.length - 1]);
}
// feature so that when you click on a button the info gets displayed.
// let newcityButtons = querySelector(".cityButtons");
// newcityButtons.addEventListener("click", function (e) {
//   e.preventDefault();
//   fetchweather(e.target.value);
// });
fetchWeatherForecast();
function fetchWeatherForecast(city) {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=imperial&appid=" +
      apiKey
  )
    .then((res) => res.json())
    .then((data) => {
      let timeF = data.list.dt_txt;
      let tempF = data.list.main.temp;
      let windF = data.list.wind.speed;
      let humidityF = data.list.main.humidity;
      console.log(tempF);
    });
}
//for loop to create boxes (i= 0 , i > 5, i ++ )
// function displayForecast() {
//   var bDiv = document.createElement("div");
//   bDiv.setAttribute("class", currentCity);
//   var Bul = document.createElement("ul");

//   var liTag = document.createElement("li");
//   var cityBtn = document.createElement("button");
// }
