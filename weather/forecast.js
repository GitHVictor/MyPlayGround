// Purpose: Returns weather data from a  spefic location - longitude and latitude
const request = require('request')

// weather service API - darksky.net
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/db86bbee23295987ba4daa0c26efb048/' + latitude + ',' + longitude
    //  console.log(url)
    
    // request npm - http calls - json object and function to hold response from request
    request({ url, json: true }, (error, response) => {
        // JSON.parse(response.body) - get response in json format  if json property is turned off
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast