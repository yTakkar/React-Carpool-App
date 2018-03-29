/* eslint no-unused-vars: 0 */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import store from '../src/store/store'

let element = document.getElementById('react-app')
if (element) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    element
  )
}
