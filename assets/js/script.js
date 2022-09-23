let apiKey = "&appid=64fad7b0711ab718bafff9d92159faea";



function retrieveData (cityName) {
    let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?id=' + cityName + apiKey;

    fetch(requestUrl).then(function (response) {
        return response.json()
        })
    }