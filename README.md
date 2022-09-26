# Weather Dashboard

## Description
This application is a dashboard showing the weather of selected cities as well as their five-day forecast. On loading, search a city name to get this information. Additionally, a button is generated that allows you to easily access this city's information again. The button is also saved to your local storage for easy access.

Below are outlines of the important functions used in the application.

### getCity
This function takes the inputted string and attempts to correct it so that it can provide the functions that follow a valid query. It is unable to correct for missing spaces in the input.

### getCurrentWeather
This function sends a request to Open Weather Map for details on the weather of the requested city at present. If an invalid city name is fed to the function, it returns an error in the form of an alert. After loading the current weather, this function executes the buttonMaker function, detailed further below.

### getForecast
This function uses the same input as getCurrenWeather and uses it to find the 5-day forecast for that city. Since Open Weather Map's API does not return the forecast 120 hours from present the forecast returns the weather for the current time + x days and 21 hours.

### buttonMaker
This function creates the clickable labels with each sity underneath the search bar. It checks to make sure the inputted city does not currently appear in the list before doing so. At the end of the function, the list of cities is saved to local storage.


## Installation

This application uses the following Third-Party APIs:

- Bootstrap
- JQuery
- Day.js

Please ensure that the browser you are using supports the above APIs.

## Usage
The site is fully operational, all links have been tested and all images are backed up with alternate text. Link to deployed webpage: https://honsumal.github.io/weather-dashboard/

A screenshot of the completed application is provided below:

![Completed Webpage Image](/assets/images/finished-webpage.png)

## Credits

N/A

## License

N/A

