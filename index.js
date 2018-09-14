const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const router = require('./router')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
router(app)

const port = process.env.PORT || 3090
app.listen(port, () => { console.log(`Server listening on: ${port}`) })
