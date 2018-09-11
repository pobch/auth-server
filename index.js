const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express()



const port = process.env.PORT || 3090
app.listen(port)
console.log('Server listening on:', port)
