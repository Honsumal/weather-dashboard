let oAPIKey = "&appid=64fad7b0711ab718bafff9d92159faea";

function getCity(str){
    let city = str.toLowerCase()
    let C = str.charAt(0).toUpperCase()
    let City = C + city.slice(1)
    return City
}


function getCurrentWeather (cityName) {
    let lg = 0
    let la = 0

    // Gets temperature, wind speed, humidity, and coordinates of the selected city
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + oAPIKey + '&units=metric',
        method: 'GET', 
        }).then(function (response) {

        $('#temp0').html("Current Temperature: " + response.main.temp.toFixed(1) + ' &#8451')
        $('#wind0').html("Current Wind Speed: " + (response.wind.speed * 3.6).toFixed(1) + ' km/h')
        $('#hum0').html("Relative Humidity: " + response.main.humidity + '%')

        lg = response.coord.lon
        la = response.coord.lat

    //Used OpenUV.io API because Open Weather Map's UV API has been retired
        $.ajax({
            method: 'GET',
            dataType: 'json',
            beforeSend: function(request) {
                request.setRequestHeader('x-access-token', '0b6b6b1c744740aa9ca32506ff111886');
            },
            url: 'https://api.openuv.io/api/v1/uv?lat=' + la + '&lng=' + lg,
    
        }).then(function(response){
            $('#uv0').html("UV Index: " + response.result.uv.toFixed(1))
        }); 
    })

}
getCurrentWeather('Toronto')