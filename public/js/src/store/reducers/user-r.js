/* eslint indent:0 */
/* eslint no-unreachable:0 */

const user_def = {
  loggedIn: false,
  isLoggedInLoading: false,
  sessionUser: {},
  riders: []
}

export default (state = user_def, action) => {
  let py = action.payload

  switch (action.type) {
    case 'TOGGLE_LOGGEDIN':
      return { ...state, loggedIn: py }
      break

    case 'ISLOGGEDIN_LOADING':
      return { ...state, isLoggedInLoading: py }
      break

    case 'GET_USER_DETAILS':
      return { ...state, sessionUser: py }
      break

    case 'LOGOUT':
      return { ...state, loggedIn: false, sessionUser: {} }
      break

    case 'GET_RIDERS':
      return { ...state, riders: py }
      break

    case 'FILTER_RIDERS_BY_ROUTE':
      return { ...state, riders: filterRiders(state.riders, py) }
      break

    case 'CONFIRM_RIDE':
      return { ...state, riders: confirmRide(state.riders, py) }
      break
  }

  return state
}

const filterRiders = (riders, { startFrom, destination }) =>
  riders.filter(
    r =>
      r.startFrom.toLowerCase().includes(startFrom.toLowerCase()) &&
      r.destination.toLowerCase().includes(destination.toLowerCase())
  )

const confirmRide = (riders, rider) => {
  return riders.map(r => {
    if (r.name == rider) {
      r.availableSeats -= 1
    }
    return r
  })
}
