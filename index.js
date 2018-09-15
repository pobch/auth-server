const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
require('./models/User')

mongoose.connect('mongodb://localhost/auth')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
require('./router')(app)

const port = process.env.PORT || 3090
app.listen(port, () => { console.log(`Server listening on: ${port}`) })
