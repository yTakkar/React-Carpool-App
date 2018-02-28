const app = require('express').Router()

app.get('*', async (req, res) => {
  res.render('app')
})

module.exports = app
