var weather = document.getElementById("weather");
var current = document.getElementById("current");
var forecast = document.getElementById("forecast");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        weather.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    current.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}


function getWeather(callback) {
    let apiKey = '7cfd70cacba417bbb6f475a733bbef3a';
    var weather = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    $.ajax({
        dataType: "jsonp",
        url: weather,
        success: callback
    });
}

// getWeather(function (data) {
//     console.log('weather data received');
//     console.log(data.list[0].weather[0].description); 
//     console.log(data.list[0].weather[0].main);  
// });

// getWeather(function (data) {
//     document.write('weather data received');
//     document.write('<br>');
//     document.write(data.list[0].weather[0].description);
//     document.write('<br>');
//     document.write(data.list[0].weather[0].main);
//     document.write('<br>');
//     document.write(data.list[0].main.temp);
//     document.write('<br>');
//     document.write(data.list[0].main[0].dt_txt);
//     document.write('<br>');
// });


