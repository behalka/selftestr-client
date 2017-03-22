const Express = require('express')
const webpack = require('webpack')
const path = require('path')

const webpackConfig = require('./dev.config')
const compiler = webpack(webpackConfig)

const host = 'localhost'
const port = 3003

const serverOptions = {
  contentBase: 'http://' + host + ':' + port,
  quiet: false,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: { colors: true },
  serverSideRender: true,
}

const app = new Express()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'templates'))
app.use('/assets', Express.static(path.join(__dirname, '../src/assets')))
app.use(require('webpack-dev-middleware')(compiler, serverOptions))
app.use(require('webpack-hot-middleware')(compiler))

const routes = ['/', '/login', '/index']
app.get(routes, (req, res) => {
  const assets = res.locals.webpackStats.toJson().assetsByChunkName
  const js = Array.isArray(assets.main) ? assets.main : [assets.main]
  res.render('index', { js })
})

app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err)
  } else {
    console.info(`==> 🚧  Webpack development server listening at ${host}:${port}`)
  }
})
