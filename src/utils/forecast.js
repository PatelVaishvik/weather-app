const request = require('request')
const forecast=(latitude,longitude,callback)=>{
 
   //const url = 'http://api.weatherstack.com/current?access_key=3ed48032bfb0a306e4ad2933cc3100fc&query='+longitude +','+ latitude+'&units=m'
  // const url =  `http://api.weatherstack.com/current?access_key=3ed48032bfb0a306e4ad2933cc3100fc&query=${longitude},${latitude}&units=m`
    const url  = `http://api.weatherstack.com/current?access_key=1dac7c8e189695cbf94f1d69a8f3bc91&query=${longitude},${latitude}&units=m`
    request({url:url,json:true},(error,response)=>{ //  {url,json:true}  , (error,{body})  object destructuring and property shorthand
        if(error){
            callback('Could not connected with Weather service...',undefined)
        }else if(response.body.error){    // body.error
            callback('something went wrong with the cordinates....',undefined)
        }else{
           callback(undefined,`${response.body.current.weather_descriptions[0]} , it is currently ${response.body.current.temperature} degree out. It feels like ${response.body.current.feelslike} degree out.`)
        }                      //body.current.weather_descriptions[0]
    })
}

module.exports = forecast
