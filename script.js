$(document).ready(function() {

// set up a default city 
var city = "Evanston"
var cardBody = $(".forecastBody");

// Create function to add button when searching for a city
$(".search-button").click(function () {
    var city = $(".searchText").val();

    console.log($(this));

    // localStorage.setItem(key, value);

    // Create button for each search and run search functions on click, as well as append button
    var button = $("<button>" + city +"</button>");
    button.attr("class", "btn btn-outline-info btnRow")
    button.click(function (target) {
        console.log(target);
        var searchedCity = target.currentTarget.innerText;
        getCurrentWeather(searchedCity);
        getForecastWeather(searchedCity);
    });
    $(".addSearchButton").append(button);
   
    // Run these functions for the Search click event 
    getCurrentWeather(city);
    getForecastWeather(city);
 
 });

// This is our API key
var APIKey = "&appid=20aa66a0baa968575e1210fe8cdeaa70";

  // Create a function for displaying current weather   
  function getCurrentWeather (targetCity) {
    
    // Use moment to display current day in preferred format
    var momentTodayDate = moment().format("MM/DD/YY");

    // Build the URL we need to query the current weather
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?" +
      "q=" +
      targetCity +
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
          "<h3>" + response.name + " (" + momentTodayDate + ")" + "<span><img src='" + iconCurrentLink + "'</img></h3>"
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
  function getForecastWeather(targetCity) {
    
    // Clear existing divs for 5 day forecast created for default city or recent search first (don't have to do for current weather since those divs were not appended. The content in divs are instead replaced with each search)
    cardBody.empty();  

    // Build the URL to query 5 day forecast (displays as array of 3 hour increments) 
    var forecastQueryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      targetCity +
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
      // Define var row outside loop to only create one
      var row = $("<div>").attr("class", "row");
  
      // Create for loop using every 8 (8X3hrs=24hrs) of the array to output each day 
      for (var i = 4; i < response.list.length; i += 8) {



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

// Call the functions for the default Evanston location
 getCurrentWeather(city);
 getForecastWeather(city);


//  $(document).on("click", ".search-button", function() {
//     console.log($(this).attr("id"));
//     // this refers to the button that was clicked
//     var searchText = $(this).attr("id");
//     var text = $("." + searchText).val();
//     console.log(text);

//     var city = text;
//     getCurrentWeather();
//     getForecastWeather();


//     // Store based on key and value
//     localStorage.setItem(searchText, text);
//     alert("Saved!");
// });
  
});


// $(document).on("click", ".saveBtn", function() {
//     console.log($(this).attr("id"));
//     // this refers to the button that was clicked
//     var textInput = $(this).attr("id");
//     var text = $("." + textInput).val();
//     console.log(text);

//     // Store based on key and value
//     localStorage.setItem(textInput, text);
//     alert("Saved!");
//   });

//   // Retrieve all objects in storage and output based on index, i.e. {textInput0: "inserted text"} in localStorage
//   var allStorage = Object.entries(localStorage);
//   // Used for loop to account for all individual input fields.
//   for (var i = 0; i < allStorage.length; i++) {
//     var pair = allStorage[i];
//     var key = pair[0];
//     var value = pair[1];
//     // Naming the ids in the Button row (originally used as key to store) and the classes in the textarea row the same allows us to "pass" the value to output/retain input from local storage onto page.
//     $("." + key).val(value);
//   }




// need to look into local storage for recording past searches

// last requirement to show last searched data on reload/refresh? of page


