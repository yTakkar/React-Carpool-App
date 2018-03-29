import React from 'react'
import { humanReadable } from '../../utils/utils'

export default class Riders extends React.Component {
  render() {
    let {
      name,
      carModel,
      rating,
      away,
      availableSeats,
      startFrom,
      destination,
      mobile,
      select
    } = this.props

    return (
      <div className={`riders rider_${mobile}`} onClick={select}>
        <img src="/images/face.jpg" />
        <div className="riders_content">
          <div className="riders_top">
            <span className="riders_name bold">{name}</span>
            <span className="riders_away">
              {humanReadable(away, 'km')} away
            </span>
          </div>
          <div className="riders_bottom">
            <span className="riders_route">
              route:{' '}
              <span className="bold">
                {startFrom} to {destination}
              </span>
            </span>
            <div className="riders_others">
              <span>
                car: <span className="bold">{carModel}</span>
              </span>
              <span>
                seats available: <span className="bold">{availableSeats}</span>
              </span>
            </div>
          </div>
          <span className="riders_rating">
            {rating}
            <i class="far fa-star" />
          </span>
        </div>
      </div>
    )
  }
}
