import React from 'react'
import { Link } from 'react-router-dom'
import { FadeIn } from 'animate-components'
import Title from '../others/title'
import { connect } from 'react-redux'
import Notify from 'handy-notification'
import { commonLogin } from '../../utils/utils'
import $ from 'jquery'
import { toggleLoggedIn } from '../../store/actions/user-a'
import ShouldBeLoggedOut from './loggedOut'

@connect(store => {
  return {
    store
  }
})
export default class SignUp extends React.Component {
  state = {
    name: '',
    email: '',
    mobile: '',
    password: '',
    passwordAgain: '',
    carModel: ''
  }

  changeValue = (what, e) => this.setState({ [what]: e.target.value })

  signup = async e => {
    e.preventDefault()
    let { name, email, mobile, password, passwordAgain, carModel } = this.state,
      { dispatch } = this.props

    if (
      !name ||
      !email ||
      !mobile ||
      !password ||
      !passwordAgain ||
      !carModel
    ) {
      Notify({ value: 'Some values are missing!!' })
    } else {
      let signupOpt = {
        data: { name, email, mobile, password, passwordAgain, carModel },
        btn: $('.s_submit'),
        url: '/api/signup',
        defBtnValue: 'Signup For Free',
        done: () => dispatch(toggleLoggedIn(true))
      }
      commonLogin(signupOpt)
    }
  }

  render() {
    let { name, email, mobile, password, passwordAgain, carModel } = this.state

    return (
      <div>
        <ShouldBeLoggedOut />

        <Title value="Signup For Free" />

        <FadeIn duration="300ms">
          <div className="log_sign">
            <Link to="/login" className="pri_btn">
              Already have an account?
            </Link>
          </div>

          <div className="register cua" style={{ top: 50 }}>
            <div className="display_text">
              <span>Get started now and let the fun begins</span>
            </div>
            <form className="form_register" onSubmit={this.signup}>
              <input
                type="text"
                className="s_fullname"
                autoFocus
                spellCheck={false}
                autoComplete="false"
                placeholder="Name"
                required
                value={name}
                onChange={e => this.changeValue('name', e)}
              />
              <input
                type="email"
                className="s_email"
                spellCheck={false}
                autoComplete="false"
                placeholder="Email ID"
                required
                value={email}
                onChange={e => this.changeValue('email', e)}
              />
              <input
                type="text"
                className="s_number"
                placeholder="10-digit mobile number"
                required
                value={mobile}
                onChange={e => this.changeValue('mobile', e)}
              />
              <input
                type="password"
                id="s_password"
                className="s_password"
                placeholder="Password"
                required
                value={password}
                onChange={e => this.changeValue('password', e)}
              />
              <input
                type="password"
                id="s_password_again"
                className="s_password_again"
                placeholder="Password again"
                required
                value={passwordAgain}
                onChange={e => this.changeValue('passwordAgain', e)}
              />
              <input
                type="text"
                className="s_car_model"
                placeholder="Name of your car"
                spellCheck={false}
                required
                value={carModel}
                onChange={e => this.changeValue('carModel', e)}
              />
              <input
                type="submit"
                value="Register For Free"
                className="s_submit"
              />
            </form>
          </div>
        </FadeIn>
      </div>
    )
  }
}
