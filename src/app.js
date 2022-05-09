const hbs = require('hbs')
const path = require('path')
const express = require('express')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 4443
const publicDirectoryPath = path.join(__dirname,'../public') // console.log(__dirname)// console.log(path.join(__dirname,'../public'))
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
app.set('view engine', 'hbs')
app.set('views',viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Vaishvik Patel'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me !',
        name:'Vaishvik Patel'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help me',
        name:'Vaishvik Patel'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error :'Please provide some meaningful Information'
        })
    }
    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,   
                address: req.query.address
            })
            
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Vaishvik Patel',
        errorMessage:'Help article not Found !'
    })
})

app.get('/vaishvik',(req,res)=>{
    res.redirect('https://vaishvik-das369.github.io/vaishvik.github.io/')
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Vaishvik Patel',
        errorMessage:'Page not Found.'
    })
})

app.listen(port,()=>{
    console.log(`server start at port no = ${port}`)
})
