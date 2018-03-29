import React from 'react'
import { FadeIn } from 'animate-components'
import Title from '../others/title'
import ShouldBeLoggedIn from '../user/loggedIn'
import { connect } from 'react-redux'
import {
  getUserDetails,
  getRiders,
  filterRidersByRoute,
  confirmRide
} from '../../store/actions/user-a'
import Riders from './riders'
import { Scrollbars } from 'react-custom-scrollbars'
import $ from 'jquery'
import Notify from 'handy-notification'

@connect(store => {
  return {
    riders: store.User.riders
  }
})
export default class Home extends React.Component {
  state = {
    startFrom: '',
    destination: '',
    showClearSearch: false,
    selectRider: false,
    selectedRider: ''
  }

  componentDidMount = () => {
    let { dispatch } = this.props
    dispatch(getUserDetails())
    dispatch(getRiders())
  }

  changeValue = (what, { target: { value } }) => {
    this.setState({ [what]: value.trim() })
  }

  filter = e => {
    e.preventDefault()
    let { dispatch } = this.props,
      { startFrom, destination } = this.state
    dispatch(filterRidersByRoute({ startFrom, destination }))
    this.setState({ showClearSearch: true })
  }

  clearSearch = () => {
    this.setState({
      showClearSearch: false,
      startFrom: '',
      destination: ''
    })
    this.props.dispatch(getRiders())
  }

  selectRide = async (mobile, name) => {
    $('.riders')
      .removeClass('select_receiver_toggle')
      .find('img')
      .attr('src', '/images/face.jpg')

    let element = $(`.rider_${mobile}`)
    element
      .addClass('select_receiver_toggle')
      .find('img')
      .attr('src', '/images/tick-3.png')

    await this.setState({
      selectRider: true,
      selectedRider: name
    })
    $('.select_rider').focus()
  }

  confirmRide = e => {
    e.preventDefault()
    let { dispatch } = this.props,
      { selectedRider } = this.state
    dispatch(confirmRide(selectedRider))
    Notify({ value: `Happy carpooling with ${selectedRider}` })
    this.setState({ selectRider: false })
  }

  render() {
    let { startFrom, destination, showClearSearch, selectRider } = this.state,
      { riders } = this.props,
      map_riders = riders.map(r => (
        <Riders
          key={r.name}
          {...r}
          select={() => this.selectRide(r.mobile, r.name)}
        />
      ))

    return (
      <div>
        <ShouldBeLoggedIn />

        <Title value="Home" />

        <FadeIn duration="300ms" className="home_page">
          <div className="home">
            <div className="home_header">
              <span>PICK A RIDE</span>
            </div>

            <div className="home_main">
              <div className="home_inps">
                <div className="inps_div">
                  <span>START FROM</span>
                  <input
                    type="text"
                    spellCheck="false"
                    placeholder="Eg. Bandra"
                    autoFocus
                    value={startFrom}
                    onChange={e => this.changeValue('startFrom', e)}
                  />
                </div>

                <div className="inps_div">
                  <span>DESTINATION</span>
                  <input
                    type="text"
                    spellCheck="false"
                    placeholder="Eg. Andheri"
                    value={destination}
                    onChange={e => this.changeValue('destination', e)}
                  />
                </div>
              </div>

              {showClearSearch ? (
                <div className="cancel_search" onClick={this.clearSearch}>
                  Cancel search <i className="fas fa-times-circle" />
                </div>
              ) : null}

              <Scrollbars
                style={{ height: showClearSearch ? 340 : 365 }}
                className="home_riders"
              >
                <div className="riders_main">{map_riders}</div>
              </Scrollbars>
            </div>
          </div>

          <div className="home_btns">
            {startFrom || destination ? (
              <a
                href="#"
                className="pri_btn riders_search"
                onClick={this.filter}
              >
                Search
              </a>
            ) : null}

            <a
              href="#"
              className={`pri_btn select_rider ${
                !selectRider ? 'colored_disabled' : ''
              }`}
              onClick={this.confirmRide}
            >
              Confirm ride
            </a>
          </div>
        </FadeIn>
      </div>
    )
  }
}
