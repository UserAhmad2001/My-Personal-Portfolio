
document.addEventListener("DOMContentLoaded", (e) => {
  var slider = document.querySelector(".weather-slider");
  var longtitude;
  var latitude;
  var time = new Date();
  var hourPerMilliseconds = 3600000;
  var day = document.querySelector(".day");
  var date = document.querySelector(".date");
  var hour = document.querySelector(".hour");
  var long_field = document.querySelector(".longtitude-field");
  var lat_field = document.querySelector(".latitude-field");
  var fetchResults = null ;
  var weather_summary = document.querySelector('.weather-summary-value')
  var temp = document.getElementById('temp-value')
  var wind_speed = document.getElementById('wind-speed-value')
  var humidity = document.getElementById('humidity-value')
  var pressure = document.getElementById('pressure-value')
  var summary_icon = document.getElementById('summary-icon')
  var loading = document.querySelector('.loading-message')
  var err = document.querySelector('.error')


  var weather = ["fa-solid fa-sun", "fa-solid fa-cloud", "fa-solid fa-cloud-sun",
  "fa-solid fa-wind", "fa-solid fa-cloud-showers-heavy", "fa-solid fa-snowflake", "fa-solid fa-smog"]
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
    loading.style.display = "grid"

    const options = {
      method: "GET",
      url: "https://dark-sky.p.rapidapi.com/" + long + "," + lat + "",
      params: {
        exclude: "minutely,currently,flags,daily",
        units: "ca",
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
        console.log(response.data);
          loading.style.display = "none"
          fetchResults = response.data
          setWeather()
      })
      .catch(function (error) {
        err.style.display = "flex"
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
  function setSumIcon(sum){
    switch(sum){
      case "Clear":
        summary_icon.className = weather[0]
        if(night){summary_icon.className = "fa-solid fa-moon"}
        break;
        case "Partly Cloudy":
          summary_icon.className = weather[2]
        break;
        case "Mostly Cloudy":
        summary_icon.className = weather[1]
        break;
      case "Possible Light Rain":
        summary_icon.className = weather[4]
        break;

        case "Possible Light Rain and Windy":
        summary_icon.className = weather[6]
        break;
        case "Rain":
          summary_icon.className = weather[6]
        break;
      case "Possible Drizzle":
        summary_icon.className = weather[6]
        break;
      case "Overcast":
        summary_icon.className = weather[6]
        break;
      }
    }
  function setWeather(){
    var x = fetchResults.hourly.data[slider.value]
    console.log(x);
    setSumIcon(x.summary)
    weather_summary.innerHTML = x.summary
    temp.innerHTML = x.temperature + " C"
    wind_speed.innerHTML = x.windSpeed + " Km/h"
    humidity.innerHTML = x.humidity + " g/m3"
    pressure.innerHTML = x.pressure + " Pa"
  }
  function setNightMode(){
    if(document.querySelector('.body-weather').style.background != "white"){
      document.querySelector('.body-weather')
      .style.background = "white"
      document.querySelectorAll('.night')
      .forEach((el)=>{
        el.style.background = "white"
        el.style.color = "black"
      })
    }
    else{
      document.querySelector('.body-weather').style.background = "#000112"
      document.querySelectorAll('.night')
      .forEach((el)=>{
        el.style.background = "none"
        el.style.color = "white"
        el.style.border = "3px solid white"
      })
    }

     

  }
  function toast(message){
    var t = document.querySelector('.toast');
    t.innerHTML = message
    t.style.display = "initial"
    t.style.opacity = ".8"
    
    window.setTimeout(()=>{
      t.style.opacity = "0"
    },1000)
  }


  // EVENT LISTENERS
  slider.addEventListener("input", (e) => {
    var value = e.currentTarget.value
    setTime(value);
    setWeather();
  });
  document.getElementById('retryFetch').addEventListener('click',(e)=>{
    err.style.display = "none"
    fetchWeather(longtitude,latitude)
  })
  document.querySelector('.get-btn').addEventListener('click',(e)=>{
    fetchWeather(long_field.value,lat_field.value)
  })
  document.querySelector('.night-mode').addEventListener('click',(e)=>{
    setNightMode()
  })

  // STARTUP FUNCTIONS
  getLocation();
  setTime(0);


  



  
});
