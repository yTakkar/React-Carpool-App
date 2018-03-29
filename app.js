require('dotenv').config()

// REQUIRE PACKAGES
const express = require('express'),
  { env: { PORT, SESSION_SECRET_LETTER } } = process,
  { rainbow } = require('handy-log'),
  app = express(),
  favicon = require('serve-favicon'),
  hbs = require('express-handlebars'),
  bodyParser = require('body-parser'),
  validator = require('express-validator'),
  session = require('client-sessions'),
  mainR = require('./routes/main-routes'),
  apiR = require('./routes/api-routes')

// VIEW ENGINE
app.engine(
  'hbs',
  hbs({
    extname: 'hbs'
  })
)
app.set('view engine', 'hbs')

// MIDDLEWARES
app.use(favicon(`${__dirname}/public/images/favicon.png`))
app.use(express.static(`${__dirname}/public/`))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(validator())
app.use(
  session({
    cookieName: 'session',
    secret: SESSION_SECRET_LETTER,
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
  })
)

// ROUTES
app.use('', mainR)
app.use('/api', apiR)

app.listen(PORT, () => rainbow('App running..'))
