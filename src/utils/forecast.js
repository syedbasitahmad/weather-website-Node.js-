const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dd31d97256a933182540fe59b3a95288&query=' + latitude + ',' + longitude + '&units=m'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('unable to find location,undefined')
        } else {
            
            callback(undefined,
                'Local Time: ' +body.location.localtime+
                '.  Detail: ' + body.current.weather_descriptions[0] + ',' + ' TEMP: ' + body.current.temperature + ',' + '  It Feels Like Temp: ' + body.current.feelslike + ',' + '    There is  ' + body.current.precip + '% chance of rain.  '+
                "Humidity: "+body.current.humidity+",  Visibility: "+body.current.visibility+",  Wind Speed: "+body.current.wind_speed)
        }
    })
}
module.exports = forecast