$(document).ready(function() {

let city = "Evanston";

// This is our API key
var APIKey = "&appid=20aa66a0baa968575e1210fe8cdeaa70";

  // Create a function for displaying current weather   
  function getCurrentWeather () {
    
    // Use moment to display current day in preferred format
    var momentTodayDate = moment().format("MM/DD/YY");
  
    // Build the URL we need to query the current weather
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?" +
      "q=" +
      city +
      "&units=imperial" +
      APIKey;

    // Run the AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Log the queryURL
        console.log(queryURL);
        // Log the resulting object
        console.log(response);

        // Create var to pull the icon "code" and create var for the URL to insert next to city/date
        var iconCurrent = response.weather[0].icon;
        var iconCurrentLink = "http://openweathermap.org/img/w/" + iconCurrent + ".png";
  
        // Transfer content to HTML
        $(".city").html(
          "<h1>" + response.name + " (" + momentTodayDate + ")" + "<span><img src='" + iconCurrentLink + "'</img></h1>"
        );
        $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".temp").text("Temperature: " + response.main.temp + " °F");
  
        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed + " MPH");
        console.log("Humidity: " + response.main.humidity + "%");
        console.log("Temperature: " + response.main.temp + " °F");
  
        // Establish the latitude and longitude coordinates to use in UV query URL
        var lat = response.coord.lat;
        var lon = response.coord.lon;
            
        // Build the URL to query UV
        var UVqueryURL =
          "https://api.openweathermap.org/data/2.5/uvi?" +
          APIKey +
          "&lat=" +
          lat +
          "&lon=" +
          lon;
        
        // Run the AJAX call for UV
        $.ajax({
          url: UVqueryURL,
          method: "GET"
        })
        .then(function(response) {
          // Log the queryURL
          console.log(UVqueryURL);
  
          // Log the resulting object
          console.log(response);
  
          // Transfer content to HTML
          $(".UV").text("UV Index: " + response.value);
        });
      });
  };

  // Create a function to display 5 day forecast   
  function getForecastWeather() {

    // Build the URL to query 5 day forecast (displays as array of 3 hour increments) 
    var forecastQueryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=imperial&" +
      APIKey;
  
    // Runn the AJAX call
    $.ajax({
      url: forecastQueryURL,
      method: "GET"
    }).then(function(response) {
      // Log the queryURL
      console.log(forecastQueryURL);
  
      // Log the resulting object
      console.log(response);

      // Output the 5 day forecast and append individual data points to forecastBody class already in HTML
      var cardBody = $(".forecastBody");
      // Define var row outside loop to only create one
      var row = $("<div>").attr("class", "row");
  
      // Create for loop using every 8 (8X3hrs=24hrs) of the array to output each day 
      for (var i = 1; i < response.list.length; i += 8) {

        // Create Var for each pulled i to make it simpler to type/reference 
        var forecast = response.list[i];
        // Create var for icon code and create var for URL to insert in each day   
        var iconForecast = forecast.weather[0].icon;
        var iconForecastLink = "http://openweathermap.org/img/w/" + iconForecast + ".png";
        
        // Log the date, temp, and humidity
        console.log(forecast.dt_txt);
        console.log(forecast.main.temp);
        console.log(forecast.main.humidity);

        // Convert the time format pulled from array to preferred format using moment
        var convertedDate = moment(forecast.dt_txt, "YYYY-MM-DD HH:mm").format("MM/DD/YY");

        // Log to test converted day works
        console.log(convertedDate);

        // Create div for each day's forecast
        var forecastDiv = $("<div>");

        // Add classes to each forcast day div (made each individual cards)
        forecastDiv.attr("class", "forecast card col-sm-2");

        // Create p tags, img tag, and populate text of each data point (date, temp, icon, humidity)
        var date = $("<p>").text(convertedDate);
        var addIcon = $("<img>").attr('src', iconForecastLink);
        var temp = $("<p>").text("Temp: " + forecast.main.temp + " °F");
        var humidity = $("<p>").text("Humidity: " + forecast.main.humidity + "%");

        // Add class to date p tag and icon img tag
        date.attr("class", "forecastDate");
        addIcon.attr("class", "image");

        // Append each p tag, img tag to forecast day divs, to row div, to cardbody
        forecastDiv.append(date, addIcon, temp, humidity);
        row.append(forecastDiv);
        cardBody.append(row);
      }
    });
  };
// Call the functions
 getCurrentWeather();
 getForecastWeather();
  
});

// need to add icons
// need to then work on appending the text input to Search for City card
// and also have event listener to prompt curent and forecast functions to run
// need to look into local storage for recording past searches

// Additional notes
// event listener for the onclick event. Pass value of text input to the function. 
// document.on click
