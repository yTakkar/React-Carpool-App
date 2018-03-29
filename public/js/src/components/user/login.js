import React from 'react'
import { Link } from 'react-router-dom'
import { FadeIn } from 'animate-components'
import Title from '../others/title'
import ShouldBeLoggedOut from './loggedOut'
import { connect } from 'react-redux'
import Notify from 'handy-notification'
import $ from 'jquery'
import { toggleLoggedIn } from '../../store/actions/user-a'
import { commonLogin } from '../../utils/utils'

@connect(store => {
  return {
    store
  }
})
export default class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }

  changeValue = (what, e) => this.setState({ [what]: e.target.value })

  login = e => {
    e.preventDefault()
    let { username, password } = this.state,
      { dispatch } = this.props

    if (!username || !password) {
      Notify({ value: 'Some values are missing!!' })
    } else {
      let loginOpt = {
        data: { username, password },
        btn: $('.l_submit'),
        url: '/api/login',
        defBtnValue: 'Login To Continue',
        done: () => dispatch(toggleLoggedIn(true))
      }
      commonLogin(loginOpt)
    }
  }

  render() {
    let { username, password } = this.state

    return (
      <div>
        <ShouldBeLoggedOut />

        <Title value="Login To Continue" />

        <FadeIn duration="300ms">
          <div className="log_sign">
            <Link to="/signup" className="pri_btn">
              Need an account?
            </Link>
          </div>

          <div className="register cua" style={{ top: 125 }}>
            <div className="display_text">
              <span>Get started again</span>
            </div>
            <form className="form_login" onSubmit={this.login}>
              <input
                type="text"
                className="l_username"
                autoFocus
                required
                spellCheck={false}
                autoComplete="false"
                placeholder="Mobile number or email"
                value={username}
                onChange={e => this.changeValue('username', e)}
              />
              <input
                type="password"
                className="l_password"
                id="l_password"
                required
                placeholder="Password"
                value={password}
                onChange={e => this.changeValue('password', e)}
              />
              <input
                type="submit"
                value="Login To Continue"
                className="l_submit"
              />
            </form>

            <div className="forgot_psswrd">
              <Link
                to="/forgot-password"
                className="a_pri"
                alt="Forgot your password"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    )
  }
}
