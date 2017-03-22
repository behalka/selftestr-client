import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { configure } from './redux/store'
import Root from './containers/Root'

const store = configure()

function renderApp(Component) {
  ReactDOM.render(<Component store={store} />, document.getElementById('page'))
}

renderApp(Root)

/* eslint-disable no-undef */
if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root').default
    renderApp(NextRoot)
  })
}
