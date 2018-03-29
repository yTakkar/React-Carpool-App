import React from 'react'
import { Link } from 'react-router-dom'
import { FadeIn } from 'animate-components'
import Title from '../others/title'

export default class Error extends React.Component {
  render() {
    return (
      <div className="error">
        <Title value="Oops!! Error" />
        <FadeIn duration="300ms">
          <div className="error_div">
            <div className="error_info">
              <span>Oops, the page you're looking for does not exist!!</span>
            </div>
            <img src="/images/error.svg" alt="" />
            <div className="error_bottom">
              <Link to="/" className="pri_btn">
                Try going to homepage
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    )
  }
}
