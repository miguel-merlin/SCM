const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const recursoRoutes = require('./routes/recursos')
const gruposRoutes = require('./routes/grupos')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/public', express.static(`${__dirname}/storage/imgs`))

app.use('/v1', recursoRoutes)
app.use('/v1', gruposRoutes)

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

module.exports = app