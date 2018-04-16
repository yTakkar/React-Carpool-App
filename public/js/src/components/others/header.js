import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/user-a'
import Notify from 'handy-notification'

@connect(store => {
  return {
    loggedIn: store.User.loggedIn
  }
})
export default class Header extends React.Component {
  logout = async e => {
    e.preventDefault()
    let { dispatch } = this.props
    await dispatch(logout())
    Notify({ value: 'Logged out!!' })
  }

  render() {
    let { loggedIn } = this.props

    return (
      <div>
        <div className="index_header">
          <div className="header_logo nh_logo">
            <img src="/images/carpool.png" alt="Carpool" />
            <hr />
            <span>Carpool</span>
          </div>
          <div className="right">
            {!loggedIn ? (
              <Fragment>
                <NavLink to="/signup">Signup</NavLink>
                <NavLink to="/login">Login</NavLink>
              </Fragment>
            ) : null}
            {loggedIn ? (
              <a href="#" onClick={this.logout}>
                Logout
              </a>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}
