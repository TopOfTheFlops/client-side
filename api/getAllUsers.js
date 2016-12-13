import request from 'superagent'
import url from './apiUrl'

module.exports = (dispatch) => {
  request
    .get(`${url}/api/v1/users`)
    .withCredentials()
    .end((err, res) => {
      if (err) return console.log(err)
      dispatch({type: 'RECEIVE_ALL_USERS', payload: res.body.users})
    })
}
