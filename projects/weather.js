// import axios from "axios";

document.addEventListener("DOMContentLoaded", (e) => {
  var slider = document.querySelector(".weather-slider");
  var longtitude;
  var latitude;
  var time = new Date();
  var dateInMilliseconds = time.getTime();
  var hourPerMilliseconds = 3600000;
  var day = document.querySelector(".day");
  var date = document.querySelector(".date");
  var hour = document.querySelector(".hour");
  var long_field = document.querySelector(".longtitude-field");
  var lat_field = document.querySelector(".latitude-field");
  var fetchResults = null ;
  var weather_summary = document.querySelector('.weather-summary-value')
  var temp = document.querySelector('.temp-value')
  var wind_speed = document.querySelector('.wind-speed-value')
  var humidity = document.querySelector('.humidity-value')
  var pressure = document.querySelector('.pressure-value')

  var daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // FUNCTIONS
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getLocationSuccess);
    } else {
      window.alert("Geolocation is not supported by this browser.");
    }
  }
  function getLocationSuccess(position) {
    latitude = position.coords.latitude;
    longtitude = position.coords.longitude;
    long_field.value = position.coords.longitude;
    lat_field.value = position.coords.latitude;
    fetchWeather(longtitude,latitude)
  }
  function fetchWeather(long, lat) {
    const options = {
      method: "GET",
      url: "https://dark-sky.p.rapidapi.com/" + long + "," + lat + "",
      params: {
        exclude: "minutely",
        units: "auto",
        extend: "hourly",
        lang: "en",
      },
      headers: {
        "X-RapidAPI-Key": "9cbb95a928msh2821046b9963db6p18054djsn98224f99e3f9",
        "X-RapidAPI-Host": "dark-sky.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        fetchResults = response.data
        setWeather()
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  function setTime(hoursToAdd) {
    time = new Date();
    var timeToSet = time.getTime() + hoursToAdd * hourPerMilliseconds;
    time.setTime(timeToSet);
    day.innerHTML = daysOfTheWeek[time.getDay()];
    date.innerHTML =
      time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear();

    let zero_number1 = "";
    let zero_number2 = "";
    if (time.getHours() < 10) {
      zero_number1 = "0";
    } else if (time.getMinutes() < 10) {
      zero_number2 = "0";
    }

    hour.innerHTML =
      zero_number1 + time.getHours() + ":" + zero_number2 + time.getMinutes();
  }
  function setWeather(){
    var x = fetchResults.hourly[slider.value]
    weather_summary.innerHTML = x.summary
    temp.innerHTML = x.temperature
    wind_speed.innerHTML = x.wind_speed
    humidity.innerHTML = x.humidity
    pressure.innerHTML = x.pressure
  }

  // EVENT LISTENERS
  slider.addEventListener("input", (e) => {
    var value = e.currentTarget.value
    setTime(value);
    setWeather();
  });

  // STARTUP FUNCTIONS
  getLocation();
  setTime(0);


  



  
});
