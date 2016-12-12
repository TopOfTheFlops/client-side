import request from 'superagent'
import url from './apiUrl'

module.exports = (dispatch, userInfo, state) => {
  request
    .post(`${url}/api/v1/users/edit${state.currentUser.userId}`)
    .withCredentials()
    .send(userInfo)
    .end((err, res) => {
      if (err) return console.log(err)
      if (res.body.error) {
        dispatch({type: 'CHANGE_PAGE', payload: '/unauthenticated'})
      }
      dispatch({type: 'CHANGE_PAGE', payload: '/profile'})
      dispatch({type: 'REMOVE_PHOTO_URL'})
    })
}
