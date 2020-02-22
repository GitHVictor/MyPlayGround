// Purpose: Geolocation API
const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + 

    '.json?access_token=pk.eyJ1IjoiYnJ1bm9tY2Rvbm5hbGQiLCJhIjoiY2syd2s1bmpwMGdjbTNjcWhibHJuenVzNyJ9.DApeNZAWKmMAnUHW4qdDsA&limit=1'

    console.log(url)
    // pk.eyJ1IjoiYnJ1bm9tY2Rvbm5hbGQiLCJhIjoiY2syd2hvMmpmMGN3aTNucXczdmdoajh4YiJ9.G6qOvF5fHVRdUQkyjVAhTg

    request({ url, json: true }, ( error, response ) => {
        if ( error ) {
            callback(' Unable to connect to location services!', undefined )
        } else if ( response.body.features.length === 0 ) {
          //  console.log('feature length' + body.features.length);
            callback(' Unable to find location. Try another search.', undefined )
        } else {
            callback( undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode