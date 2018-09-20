const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

require('./models/User')
require('./services/passport')

mongoose.connect('mongodb://localhost/auth').catch(err => {
  console.log('connect to mongoDB error !!')
  console.log(err)
  process.exit(1)
})

const app = express()

app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())
require('./router')(app)

const port = process.env.PORT || 3090
app.listen(port, () => { console.log(`Server listening on: ${port}`) })
