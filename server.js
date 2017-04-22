const express = require('express')
const env = require('gulp-env')
const fs = require('fs')
const api = require('./api')

if (fs.existsSync('.env.json')) {
  env('.env.json')
}

let app = module.exports.app = exports.app = express()
app.set('port', process.env.port || 8080)
app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}/`)
})

app.use(require('connect-livereload')({port: process.env.lr_port || 35729}))
app.use('/', express.static('./'))
app.use('/api', api)


