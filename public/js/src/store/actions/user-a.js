import { post } from 'axios'

export const toggleLoggedIn = what => {
  return {
    type: 'TOGGLE_LOGGEDIN',
    payload: what
  }
}

export const isLoggedInLoading = bool => {
  return {
    type: 'ISLOGGEDIN_LOADING',
    payload: bool
  }
}

export const isLoggedIn = () => {
  return dispatch => {
    post('/api/is-loggedIn')
      .then(p => {
        dispatch({ type: 'TOGGLE_LOGGEDIN', payload: p.data })
        dispatch({ type: 'ISLOGGEDIN_LOADING', payload: false })
      })
      .catch(e => console.log(e))
  }
}

export const getUserDetails = () => {
  return dispatch => {
    post('/api/get-user-details')
      .then(p => dispatch({ type: 'GET_USER_DETAILS', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const logout = () => {
  return dispatch => {
    post('/api/logout')
      .then(() => dispatch({ type: 'LOGOUT' }))
      .catch(e => console.log(e))
  }
}

export const getRiders = () => {
  return dispatch => {
    post('/api/get-riders')
      .then(p => dispatch({ type: 'GET_RIDERS', payload: p.data }))
      .catch(e => console.log(e))
  }
}

export const filterRidersByRoute = route => {
  return {
    type: 'FILTER_RIDERS_BY_ROUTE',
    payload: route
  }
}

export const confirmRide = rider => {
  return {
    type: 'CONFIRM_RIDE',
    payload: rider
  }
}
