/* eslint no-unused-vars:0 */

import React from 'react'
import Helmet from 'react-helmet'

const Title = ({ value }) => (
  <Helmet>
    <title>{`${value}`} • Carpool</title>
  </Helmet>
)

export default Title
