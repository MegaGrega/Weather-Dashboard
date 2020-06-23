
// User Enters a city into the search bar
// When they press search: 
// the city name + current weather appears in the big box
// The five day forcast is listed underneath for that city
// A new button is created from local storage that displays the city name
// When you click on that button
// The city name + current weather appears in the big box + 5 day forecast



$("#submit-button").on("click", function (event) {                                                                                            // On click of the submit button
    event.preventDefault()                                                                                                                    // Prevent Default - Prevent Refresh
                                                                                                        
    var searchCity = $("#input-field").val()                                                                                                  // Variable for text input
    var cityHeading = $("#city-heading")                                                                                                      // Variable for City Heading
    var cityTemp = $("#temp")                                                                                                                 // Variable for Temperature Text
    var cityHumidity = $("#humidity")                                                                                                         // Variable for Humidity Text
    var cityWind = $("#wind")                                                                                                                 // Variable for Wind Text
    var cityUV = $("#uv-index")                                                                                                               // Variable for UV-Index Text -- NOT CORRECT RIGHT NOW

    var queryWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=651e68d610cb63f8cfe4cc2d03ffe093"       // Api End weather variable
    var queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + 
    "&cnt=5&appid=651e68d610cb63f8cfe4cc2d03ffe093"                                                                                           // Api End forecast variable
    $.ajax({                                                                                                                                  // Ajax Request
        url: queryWeatherURL,
        method: "GET"
    }).then(function (response) {

        cityHeading.text(response.name)                                                                                                        // Sets City Heading to City Name
        cityTemp.text("Temperature: " + response.main.temp)                                                                                    // Sets City Temperature
        cityHumidity.text("Humidity: " + response.main.humidity)                                                                               // Sets City Humidity
        cityWind.text("Wind Speed: " + response.wind.speed)                                                                                    // Sets Wind Speed
        cityUV.text("Description: " + response.weather[0].description)                                                                  

    })
    $.ajax({                                                                                                                                  // Ajax request
        url: queryForecastURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.list);
        var                                                           

    })
})
