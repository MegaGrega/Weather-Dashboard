
var locations = JSON.parse(localStorage.getItem("locations"))                                                                                   // Sets array to local storage
if(locations == null){                                                                                                                          // Checks if array is null - if so sets it to empty
    locations = []
}
createList() 
if(locations.length > 0){                                                                                                                       // Checks if anything is in the array
    cityInfo(locations[locations.length-1])                                                                                                     // Loads the last value
}
$("#submit-button").on("click", function (event) {                                                                                              // On click of the submit button
    event.preventDefault()                                                                                                                      // Prevent Default - Prevent Refresh
    //if $("#input-field").val() is not valid ask them to put in a correct city and
    cityInfo($("#input-field").val())
    storeSubmit()
    createList()
    $(".cityItem").on("click", function (event) {                                                                                               // On click of a City List Item
        event.preventDefault()     
        cityInfo(this.getAttribute("data-name") )
    })
})

$(".cityItem").on("click", function (event) {                                                                                                   // On click of a City List Item
    event.preventDefault()     
    cityInfo(this.getAttribute("data-name") )
})

function cityInfo(searchCity) {
    var cityHeading = $("#city-heading")                                                                                                        // Variable for City Heading
    var cityTemp = $("#temp")                                                                                                                   // Variable for Temperature Text
    var cityHumidity = $("#humidity")                                                                                                           // Variable for Humidity Text
    var cityWind = $("#wind")                                                                                                                   // Variable for Wind Text
    var cityUV = $("#uv-index")                                                                                                                 // Variable for UV-Index Text

    var queryWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity +
        "&units=imperial&appid=651e68d610cb63f8cfe4cc2d03ffe093"                                                                                // Api End weather variable
    $.ajax({                                                                                                                                    // Ajax Request
        url: queryWeatherURL,
        method: "GET"
    }).then(function (response) {

        cityHeading.text(response.name)                                                                                                         // Sets City Heading to City Name
        cityTemp.text("Temperature: " + response.main.temp)                                                                                     // Sets City Temperature
        cityHumidity.text("Humidity: " + response.main.humidity)                                                                                // Sets City Humidity
        cityWind.text("Wind Speed: " + response.wind.speed)                                                                                     // Sets Wind Speed

        var queryForecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&exclude=hourly&units=imperial&appid=651e68d610cb63f8cfe4cc2d03ffe093`

        $.ajax({                                                                                                                                // Ajax request for forecast
            url: queryForecastURL,
            method: "GET"
        }).then(function (response) {
            var forecastHolder = $("#forecast-holder")                                                                                          // The row that holds the forecast cards
            forecastHolder.empty();                                                                                                             // Empties out previous cards
            cityUV.text("UV Index: " + response.daily[0].uvi)
            if(response.daily[0].uvi <= 2){                                                                                                     // If statements to color UV text
                document.getElementById("uv-index").style.backgroundColor = "green";
            }else if (response.daily[0].uvi >2 & response.daily[0].uvi <=5){
                document.getElementById("uv-index").style.backgroundColor = "yellow";
            }else if (response.daily[0].uvi >5 & response.daily[0].uvi <=7){
                document.getElementById("uv-index").style.backgroundColor = "orange";
            }else{
                document.getElementById("uv-index").style.backgroundColor = "red";
            }


            for (i = 1; i < 6; i++) {                                                                                                           // Loops 5 Times

                var iconTag = response.daily[i].weather[0].icon                                                                                 // Stores icon tag variable
                var column = $('<div class = "col-auto"></div>')                                                                                // Creates column variable
                var card = $('<div class = "card"></div>')                                                                                      // Creates card variable
                var cardBody = $('<div class = "card-body weather-card"></div>')                                                                // creates Card Body variable
                var iconImg = $(`<img id="wicon" src="http://openweathermap.org/img/w/${iconTag}.png"alt="Weather icon">`)                      // Creates Img Element with icontag url
                var tempText = $(`<p>Temp: ${response.daily[i].temp.day}</p>`)
                var humidText = $(`<p>Humidity: ${response.daily[i].humidity}</p>`)
                var date = moment(response.daily[i].dt * 1000).format('DD-MM-YYYY')
                cardBody.append(date, iconImg, tempText, humidText)
                card.append(cardBody)                                                                                                            // Appends cardbody to card
                column.append(card)                                                                                                              // Appends card to column
                forecastHolder.append(column)                                                                                                    // Appends column to forecast row
            }

        })
    })
}
function createList(){                                                                                                                             // Creates city list items
    var searchHolder = $("#saved-search-holder")                                                                                                   // Container on the page
    searchHolder.empty()
    locations.forEach(element => {
        var newListItem = $(`<li class="list-group-item cityItem" data-name = "${element}">${element}</li>`)
        searchHolder.append(newListItem)
    });
    
    
}
function storeSubmit(){
    var cityName = $("#input-field").val()
    var capitalizeName = cityName.charAt(0).toUpperCase() + (cityName.slice(1)).toLowerCase()
    if(locations.includes(capitalizeName) === false){
        locations.push(capitalizeName)
        localStorage.setItem("locations", JSON.stringify(locations));
    }
    $("#input-field").val("") 
}
