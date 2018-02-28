let updateWidget = function(data) {

  console.log("Got weather data: ", data)
  // YOUR CODE GOES HERE

  // HINT:
  // Weather icons are provided for you. Sample URL: http://openweathermap.org/img/w/01d.png
  // The very last part ('01d.png') should be obtained from the weather information.
//


  let weatherData = Math.round(data.main["temp"])
  let weatherTemp = $('#weather p')
  weatherTemp.html('<p class="card-text">' + "It is " + weatherData + " degrees outside." + '</p>')

  let weatherImage = data.weather[0]
  let weather_url = "http://openweathermap.org/img/w/" + weatherImage.icon + ".png"
  $("#weather img").attr("src", weather_url)

  let weatherName = data.name
  let weatherLocation = $('.card-title')
  weatherLocation.html('<h4 class="card-title">' + weatherName + '</h4>')

}



let getWeather = function(info) {

  // let latitude = '48.8566';
  // let longitude = '2.3522';
  let latitude = info.coords.latitude.toFixed(4)
  let longitude = info.coords.longitude.toFixed(4)

  let apiKey = '5493a82a7d5f7d8a241d3f8deb12e3dc'; // REPLACE THIS VALUE with your own key.-- DONE

  let weatherServiceURL = 'https://api.openweathermap.org/data/2.5/weather?'
  weatherServiceURL += 'lat=' + latitude
  weatherServiceURL += '&lon=' + longitude
  weatherServiceURL +='&appid=' + apiKey + '&units=imperial'


  fetch(weatherServiceURL).then(convertToJSON).then(updateWidget).catch(displayError);

}


let handlePosition = function(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getWeather);
}


$("#get_forecast").on("click", handlePosition)


////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANY CODE BEYOND THIS POINT
////////////////////////////////////////////////////////////

let convertToJSON = function(rawData) { return rawData.json(); }
let displayError = function(error) { console.debug(error); }
