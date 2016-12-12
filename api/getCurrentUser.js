import request from 'superagent'
import url from './apiUrl'

module.exports = (dispatch, userId) => {
  request
    .get(`${url}/api/v1/users/${userId}`)
    .end((err, res) => {
      if (err) return console.log(err)
      dispatch({type: 'RECEIVE_CURRENT_USER', payload: res.body.user})
    })
}
