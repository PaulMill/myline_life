'use strict'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app.disable('x-powered-by')
app.use(morgan('dev'))
app.use(cookieParser())

app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.use('/api/upload', require('./routes/upload'))

app.use(bodyParser.json())
app.use('/api/users', require('./routes/users'))
app.use('/api/tokens', require('./routes/token'))
app.use('/api/perms', require('./routes/permissions'))
app.use('/api/photos', require('./routes/photos'))
app.use('/api/albums', require('./routes/albums'))


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
})

app.use((_req, res) => {
  res.sendStatus(404)
})

// eslint-disable-next-line max-params
app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.output.payload.message) //if error (payload) make sure you using 'boom' npm package
  }

  //eslint-disable-next-line no-console
  console.error(err.stack)
  res.sendStatus(500)
})


module.exports = app;
