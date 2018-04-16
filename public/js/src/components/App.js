import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './others/header'
import Home from './home/home'
import Login from './user/login'
import SignUp from './user/signup'
import Error from './others/error'
import { connect } from 'react-redux'
import { isLoggedIn, isLoggedInLoading } from '../store/actions/user-a'
import Loading from './others/loading'

@connect(store => {
  return {
    loading: store.User.isLoggedInLoading
  }
})
export default class App extends React.Component {
  componentDidMount = () => {
    let { dispatch } = this.props
    dispatch(isLoggedInLoading(true))
    dispatch(isLoggedIn())
  }

  render() {
    let { loading } = this.props

    return (
      <Router>
        {loading ? (
          <Loading />
        ) : (
          <div className="app">
            <Header />
            <div className="badshah">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Route component={Error} />
              </Switch>
            </div>
          </div>
        )}
      </Router>
    )
  }
}
