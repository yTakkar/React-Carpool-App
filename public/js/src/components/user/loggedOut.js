import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

@connect(store => {
  return {
    loggedIn: store.User.loggedIn
  }
})
export default class ShouldBeLoggedOut extends React.Component {
  render() {
    let { loggedIn } = this.props

    return <div>{loggedIn ? <Redirect to="/" /> : null}</div>
  }
}
