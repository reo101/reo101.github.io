var weather = document.getElementById("weather");
weather.style.opacity = 0;
// var current = document.getElementById("current");
// var forecast = document.getElementById("forecast");

// function getContent() {
//     var $ = this.load(html);
//     // window.frames['weather'].document.innerHtml;
//     var url = $('weather').attr('src');
//     request(url, function(err, res, html){
//        console.log(html);
//     });
// }

!function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://weatherwidget.io/js/widget.min.js';
        fjs.parentNode.insertBefore(js, fjs);
    }
}(document, 'script', 'weatherwidget-io-js');


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


// function getWeather(callback) {
//     let apiKey = '8a3da9bdc288d670738352a29fdf0a1b';
//     var weather = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
//     window.open(weather, '_blank');
//     $.ajax({
//         dataType: "jsonp",
//         url: weather,
//         success: callback
//     });
// }

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


