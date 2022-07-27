let inputEl = document.getElementById("SearchedInput");
console.log(inputEl);
const searchBtn = document.getElementById("searchB");
let textInput;
let locationT = document.querySelector(".locationMB");
let tempT = document.querySelector("#temp-1");
let windT = document.querySelector("#wind-1");
let humT = document.querySelector("#hum-1");
let uvT = document.querySelector("#uv-1");
let todayEl = document.querySelector(".date-1");

let tempFel = document.querySelector("#temp2-1");
let windFel = document.querySelector("#wind2-1");
let humFel = document.querySelector("#hum-1");
let dateFel = document.querySelector("#dateF");
//lower created container for forecast
let containerF = document.querySelector("#lowerContainers");

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
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

function fetchweather(city) {
  console.log(city);
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

      fetch(
        ` https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${apiKey}`
      )
        .then((res) => res.json())
        .then((uvD) => {
          console.log(uvD);
          uvT.innerText = "UV Index: " + uvD.current.uvi;
          var forecastArray = uvD.daily;

          // for loop to create boxes
          for (let i = 0; i < forecastArray.length; i++) {
            let tempF = uvD.daily[i].temp.day;
            console.log(tempF);
            let windF = uvD.daily[i].wind_speed;
            console.log(windF);
            let humidityF = uvD.daily[i].humidity;
            console.log(humidityF);
            let unixsF = uvD.daily[i].dt;
            console.log(unixsF);
            let dateFC = new Date(unixsF * 1000);
            console.log(dateFC);
            let iconF = uvD.daily[i].weather[0].icon;
            console.log(iconF);
            // console.log(forecastArray);
            //
            if (i < 5) {
              var fDiv = document.createElement("div");
              fDiv.setAttribute("class", "lowc2");
              //
              var dateF = document.createElement("h1");
              dateF.setAttribute("class", "bottomForecast");
              dateF.innerText = dateFC.toDateString();
              //
              var ulF = document.createElement("ul");
              ulF.setAttribute("class", "Ul2");
              //
              var liiconF = document.createElement("img");
              liiconF.setAttribute("class", "lis2");
              liiconF.setAttribute(
                "src",
                "http://openweathermap.org/img/wn/" + iconF + ".png"
              );

              //
              var litempF = document.createElement("li");
              litempF.setAttribute("class", "lis2");
              litempF.innerText = "Temp: " + tempF + " °F";
              //
              var liwindF = document.createElement("li");
              liwindF.setAttribute("class", "lis2");
              liwindF.innerText = "Wind: " + windF + "MPH";
              //
              var lihumF = document.createElement("li");
              lihumF.setAttribute("class", "lis2");
              lihumF.innerText = "Humidity: " + humidityF + "%";
              //
              ulF.appendChild(liiconF);
              ulF.appendChild(litempF);
              ulF.appendChild(liwindF);
              ulF.appendChild(lihumF);
              fDiv.appendChild(dateF);
              fDiv.appendChild(ulF);
              containerF.appendChild(fDiv);
            }
          }
        });
      //do forloop here
      // document.querySelector(".locationMB").innerText = name;
      // document.querySelector(".temp-1").innerText = temp;
      // document.querySelector(".wind-1").innerText = wind;
      // document.querySelector(".hum-1").innerText = humidity;
    });
}

displayPreviousSearches();
//event listener for searches
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e);
  saveCity();
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
  fetchweather(cityNameBtns[cityNameBtns.length - 1]);
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
    cityBtn.addEventListener("click", (e) => prevSearches(e));
  }
}

function prevSearches(e) {
  e.preventDefault();

  console.log(e);

  fetchweather(e.target.id);
}

// feature so that when you click on a button the info gets displayed.
let newcityButtons = document.querySelector(".cityButtons");
newcityButtons.addEventListener("click", function (e) {
  e.preventDefault();
  saveCity();
  fetchweather(e.target.value);
});
