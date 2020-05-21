const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
    //console.log(__dirname)
    //console.log(__filename)

const app = express()
const port=process.env.PORT || 3000
    //define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
console.log(path.join(publicDirectoryPath))

const viewpath = path.join(__dirname, '../templates/views')
console.log(path.join(viewpath))
const partialpath = path.join(__dirname, '../templates/partials')
    //setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialpath)
    //setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Aur Mausam Kaisa Hai ?',
        name: 'Basit'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Basit'

    })
})
app.get('/help', (req, res) => {
        res.render('help', {
            title: 'Help',
            name: 'Basit',
            helptext: 'This is some helpful text.'
        })
    })
    // app.get('',(req,res)=>{
    //     res.send('<h1>WEATHER</h1>')
    // })
    // app.get('/help', (req, res) => {
    //     res.send([{
    //             name: 'basit'
    //         },
    //         {
    //             name: 'ahmad'
    //         }
    //     ])
    // })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
        // res.send({
        //     location: 'Patna',
        //     forecast: 'it is raining',
        //     address: req.query.address
        // })
})
app.get('/products', (req, res) => {
        if (!req.query.search) {
            return res.send({
                error: 'You must provide a serch term.'
            })
        }
        res.send({
            products: []
        })
    })
    //app.com
    //app.com/help
    //app.com/about
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Basit',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Syed Basit',
        errorMessage: 'Page not found.'
    })
})
app.listen(port, () => {
    console.log('server is up on port '+ port)
})