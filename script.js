$(document).ready(function () {
    let counter = 0;
    var cityBtn = $(".cityBtn");
    var key = "b2d0fce3f7c156e9e194d6f38d77d3af";
  
 
    
    function newCity(city, counter) {
        var cityList = $(".city");
        newBtn = $("<button></button>");
        newBtn.attr({ type: "button", class: "list-group-item list-group-item-action", id: `city${counter}` });
        newBtn.html(city);
        cityList.append(newBtn);
    };


    function currentWeather(resp, city, respuv) {
        
        var tempKel = resp.main.temp;
        var tempFar = Math.round(tempKel * 9 / 5 - 459.67);
        var uvI = respuv.value; 
        var humid = resp.main.humidity; 
        var windy = resp.wind.speed; 
       
        var location = $("#city"); 
        var temp = $("#temp"); 
        var humidity = $("#humidity");
        var wind = $("#wind");
        var uv = $("#uv");
        location.text(city); 
        temp.text("Temperature: " + tempFar + "°F"); 
        humidity.html("Humidity: " + humid + "%"); 
        wind.text("Wind Speed: " + windy + "mph"); 
        uv.text("UV Index: " + uvI); 
    };


    function queryUvI(resp, city) {
        var lat = resp.coord.lat; 
        var lon = resp.coord.lon; 
        var uvIQuery = "https://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: uvIQuery,
            method: "GET"
        }).then(function (respuv) {
            currentWeather(resp, city, respuv); 
        });
    };

    // 'On-Click' for handling the Current Weather Query
    cityBtn.click(function () {
        counter++;
        var city = $("#cityField").val();
        var querycurrWeat = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;
        var queryCityExt = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key;
        newCity(city, counter);
        $.ajax({
            url: querycurrWeat,
            method: "GET"
        }).then(function (resp) {
            queryUvI(resp, city); 
        });
        $.ajax({
            url: queryCityExt,
            method: "GET"
        }).then(function (resp) {
            queryExt(resp); 
        });
    }); 
});
    