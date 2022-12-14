let oAPIKey = "&appid=64fad7b0711ab718bafff9d92159faea";
let inputEl = $("input[id = 'searchBar']")
let cityList = []
let img = document.getElementsByClassName("wImg")
let img0 = document.getElementById('wImg0')

// Modifies entry to make it easier to make the ajax request
function getCity(str){
    let strArr = str.split(' ');
    let cityArr = []
    for (let i = 0; i < strArr.length; i++) {
        let city = strArr[i].toLowerCase();
        let C = strArr[i].charAt(0).toUpperCase();
        cityArr.push(C + city.slice(1))
    }
    console.log(cityArr.join(' '))
    return cityArr.join(' ')
}

// Requests Open Weather Map to retrieve current weather at specified location
function getCurrentWeather (cityName) {

    // Gets temperature, wind speed, humidity, and coordinates of the selected city
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + oAPIKey + '&units=metric',
        method: 'GET',
        error: function(request, status, error) {
            alert("Sorry! Your search seems to be invalid. Please try again!\nHint: Make sure to add in spaces between words in the city name.");
        }
        }).then(function (response) {

        $('#title').html(response.name + ": " + currentDay.format('dddd, DD/MM/YYYY'))
        $('#temp0').html("Current Temperature: " + response.main.temp.toFixed(1) + ' &#8451')
        $('#wind0').html("Current Wind Speed: " + (response.wind.speed * 3.6).toFixed(1) + ' km/h')
        $('#hum0').html("Relative Humidity: " + response.main.humidity + '%')
        $('#wImg0').attr('src', "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

        buttonMaker(response.name)

    })

}

//Requests Open Weather Map to retrieve future weather at specified location
function getForecast (cityName) {
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + oAPIKey + '&units=metric',
        method: 'GET', 
        }).then(function (response) {

            // Each list item shows the forecast every 3 hours, up to 4 days and 21 hours in the future
            // To ensure that the following function works, the application takes the forecast for each day 3 hours earlier than the same time for the current day
            $('.date').each(function() {
                $(this).html(dayjs.unix(response.list[($(this).attr('date') * 8 - 1)].dt).format('dddd, DD/MM/YYYY'))
            })

            $('.temp').each(function() {
                $(this).html("Temperature: " + response.list[($(this).attr('date') * 8 - 1)].main.temp.toFixed(1) + ' &#8451')
            })

            $('.wind').each(function() {
                $(this).html("Wind Speed: " + (response.list[($(this).attr('date') * 8 - 1)].wind.speed * 3.6).toFixed(1) + ' km/h')
            })

            $('.hum').each(function() {
                $(this).html("Humidity: " + response.list[($(this).attr('date') * 8 - 1)].main.humidity.toFixed(0) + '%')
            })

            //Code for Weather Icon

            $('.wImg').each(function() {
                $(this).attr('src', "http://openweathermap.org/img/w/" + response.list[($(this).attr('date') * 8 - 1)].weather[0].icon + ".png")
            })

    })
}

// Makes each of the entered cities a clickable button that acts as a shortcut to that city's weather data
function buttonMaker(cName){

    if(!cityList.includes(cName)){
       
        cityList.push(cName)
        let lCity = $('<li>');
        lCity.text(cName);
        lCity.addClass('cityName');
        lCity.attr('id', cName);
        $('#cityList').append(lCity); 

        let cities = document.querySelectorAll(".cityName");
        for (let i = 0; i < cities.length; i ++) {
        cities[i].setAttribute('onclick', 'findCity ($(this).attr("id"))');
        }

        localStorage.setItem('cityList', JSON.stringify(cityList))
    }

}

// Makes the buttons at initialization based on locally stored city names
function initButtonMaker(){
    for (let i = 0; i < cityList.length; i++) {
        let lCity = $('<li>');
        lCity.text(cityList[i]);
        lCity.addClass('cityName');
        lCity.attr('id', cityList[i]);
        $('#cityList').append(lCity); 
    }
    let cities = document.querySelectorAll(".cityName");
        for (let i = 0; i < cities.length; i ++) {
        cities[i].setAttribute('onclick', 'findCity ($(this).attr("id"))');
        }
}

// Active when a city is entered into search bar
function searchCity(event) {
    event.preventDefault();
    for (let i = 0; i < img.length; i++) {
        img[i].setAttribute('style', 'display: shown')
    }
    
    img0.setAttribute('style', 'display: shown')

    let newCity = getCity(inputEl.val());
    getCurrentWeather(newCity);
    getForecast(newCity);

    inputEl.val('')

}

// Provides functionality to each city button
function findCity (cityName){
    for (let i = 0; i < img.length; i++) {
        img[i].setAttribute('style', 'display: shown')
    }
    img0.setAttribute('style', 'display: shown')

    getCurrentWeather(cityName);
    getForecast(cityName);
}

// Provides functionality to the search bar
$('#search').on('submit', searchCity)
let currentDay = dayjs()

// Loads local storage on startup
function init(){
    let storedCityList = JSON.parse(localStorage.getItem("cityList"))
    if (storedCityList !== null) {
        cityList = storedCityList;
        initButtonMaker();
    } else {
        cityList = []
    }

    for (let i = 0; i < img.length; i++) {

        if(!img[i].getAttribute('src')){
            img[i].setAttribute('style', 'display: none')
        } 
    }

    if(!img0.getAttribute('src')){
        img0.setAttribute('style', 'display: none')
    }
}

init()