let oAPIKey = "&appid=64fad7b0711ab718bafff9d92159faea";
let inputEl = $("input[id = 'searchBar']")

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

        $('#uv0').html("UV Index: " + 0)

    //Used OpenUV.io API because Open Weather Map's UV API has been retired
        // $.ajax({
        //     method: 'GET',
        //     dataType: 'json',
        //     beforeSend: function(request) {
        //         request.setRequestHeader('x-access-token', '4d9ae09605283ed3041fcb758ab23175');
        //     },
        //     url: 'https://api.openuv.io/api/v1/uv?lat=' + la + '&lng=' + lg,
    
        // }).then(function(response){
        //     $('#uv0').html("UV Index: " + response.result.uv.toFixed(1))
        // });
    })

}
function getForecast (cityName) {
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + oAPIKey + '&units=metric',
        method: 'GET', 
        }).then(function (response) {
            console.log(response)

            // Each list item shows the forecast every 3 hours, up to 4 days and 21 hours in the future
            // To ensure that the following function works, the application takes the forecast for each day 3 hours earlier than the same time for the current day
            $('.date').each(function() {
                $(this).html(dayjs.unix(response.list[($(this).attr('date') * 8 - 1)].dt).format('dddd, DD/MM/YYYY'))
            })

            $('.temp').each(function() {
                $(this).html("Forecast Temperature: " + response.list[($(this).attr('date') * 8 - 1)].main.temp.toFixed(1) + ' &#8451')
            })

            $('.wind').each(function() {
                $(this).html("Forecast Wind Speed: " + (response.list[($(this).attr('date') * 8 - 1)].wind.speed * 3.6).toFixed(1) + ' km/h')
            })

            $('.hum').each(function() {
                $(this).html("Forecast Humidity: " + response.list[($(this).attr('date') * 8 - 1)].main.humidity.toFixed(0) + '%')
            })

    })
}

function searchCity(event) {
    event.preventDefault();

    let newCity = getCity(inputEl.val());

    $('#title').html(inputEl.val() + ": " + currentDay.format('dddd, DD/MM/YYYY'))
    getCurrentWeather(newCity);
    getForecast(newCity);
    
    let lCity = $('<li>');
    lCity.text(newCity);
    lCity.addClass('cityName')
    lCity.attr('id', newCity)
    $('#cityList').append(lCity);
    inputEl.val('')

    let cities = document.querySelectorAll(".cityName")
    for (let i = 0; i < cities.length; i ++) {
        cities[i].setAttribute('onclick', 'findCity ($(this).attr("id"))');        
    }
}

function findCity (cityName){
    console.log(cityName);
    getCurrentWeather(cityName);
    getForecast(cityName);
}



$('#search').on('submit', searchCity)
let currentDay = dayjs()

function init(){
    let storedCityList = []
    storedCityList = [1,1]
}

init()