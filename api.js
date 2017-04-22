const express = require('express')

let api = express.Router()

api.get('/', (req, res) => {
  res.send('Api/index')
})

module.exports = api
