const Express = require('express')
const webpack = require('webpack')
const path = require('path')

const webpackConfig = require('./beta.config')
const compiler = webpack(webpackConfig)

const host = process.env.HOST
const port = process.env.PORT

const app = new Express()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'templates'))

// bundle.js
app.use(Express.static(path.join(__dirname, '../dist')))
// csska apod nejsou zkompilovana O:)
app.use('/assets', Express.static(path.join(__dirname, '../src/assets')))

const routes = ['/', '/index']
app.get(routes, (req, res) => {
  res.render('heroku')
})

app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err)
  } else {
    console.info(`Webpack heroku server listening at ${host}:${port}`)
  }
})
