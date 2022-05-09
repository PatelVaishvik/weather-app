const request = require('request')
const geoCode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGFzMzY5IiwiYSI6ImNsMmhjejJneDAwd2Mzam10MTlvNWt0M2wifQ.sm8la-A7h0l6bD7JJL8jjw'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to location services!',undefined)
        }else if(response.body.features.length===0){
            callback('Unabled to find Location , try again...',undefined)
        }else{
            callback(undefined, {
                 latitude : response.body.features[0].center[0],
                 longitude : response.body.features[0].center[1],
                 location : response.body.features[0].place_name 
            })
        }
    })
}
module.exports = geoCode