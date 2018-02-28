import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './others/header'
import Home from './home/home'
import Login from './user/login'
import SignUp from './user/signup'
import Error from './others/error'
import { connect } from 'react-redux'
import { isLoggedIn } from '../store/actions/user-a'

@connect(store => {
  return {
    store
  }
})

export default class App extends React.Component {

  componentWillMount = () =>
    this.props.dispatch(isLoggedIn())

  render() {
    return (
      <Router>
        <div className='app'>
          <Header />
          <div className='badshah'>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/signup' component={SignUp} />
              <Route component={Error} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}
