// This is our API key
var APIKey = "20aa66a0baa968575e1210fe8cdeaa70"

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      "q=Evanston,US&units=imperial&appid=" + APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
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

      // Transfer content to HTML
      $(".city").html("<h1>" + response.name + " Weather</h1>");
      $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
      $(".humidity").text("Humidity: " + response.main.humidity + "%");
      $(".temp").text("Temperature: " + response.main.temp + " (F)");

      // UV doesn't seem to be included in the free key option and requires a different account type  

      // Converts the temp to Kelvin with the below formula
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;
      $(".tempF").text("Temperature (Kelvin) " + tempF);

      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed + " MPH");
      console.log("Humidity: " + response.main.humidity + "%");
      console.log("Temperature: " + response.main.temp + " (F)");
    });