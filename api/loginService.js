import request from 'superagent'

import url from './apiUrl'

import getLifestyles from './getLifestyles'
import getFlops from './getFlops'
import getCurrentUser from './getCurrentUser'
import getVotes from './getVotes'
import getAllUsers from './getAllUsers'

module.exports = (dispatch, userInfo) => {
  dispatch({type: 'LOGIN_INIT'})

  request
    .post(`${url}/api/v1/users/login`)
    .send(userInfo)
    .withCredentials()
    .end((err, res) => {
      if (err) {
        dispatch({type: 'LOGIN_UNSUCCESSFUL'})
      } else {
        getVotes(dispatch)
        getLifestyles(dispatch)
        getFlops(dispatch)
        getAllUsers(dispatch)
        dispatch({type: 'LOGIN_SUCCESSFUL', payload: res.body.user})
        dispatch({type: 'CHANGE_PAGE', payload: '/dashboard'})
      }
    })
}
