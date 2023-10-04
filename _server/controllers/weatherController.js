require('dotenv').config();

const WEATHER_URI = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHERKEY}&q=New York&days=3&aqi=yes&alerts=yes`

const weatherController = {};
weatherController.getForecast = (req, res, next) => {
    console.log('getting into the getforecast controller')
    fetch(WEATHER_URI)
        .then((response) => response.json())
        .then((weather) => {
            res.locals.weather = weather
            return next();
        })
        .catch((err) => {
            console.log(err)
            return next((err) => {
                err = {
                    log: 'There was an issue making the external Weather API request',
                    status: 504,
                    message: { error: 'There was an error accessing the weather data'}
                }
            })
        })
}

module.exports = weatherController