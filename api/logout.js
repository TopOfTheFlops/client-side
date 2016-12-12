import request from 'superagent'
import url from './apiUrl'

module.exports = (dispatch) => {
  request
    .get(`${url}/api/v1/users/logout`)
    .end((err, res) => {
      console.log('the response', res)
      if (err) return console.log(err)
      dispatch({type: 'LOGOUT'})
    })
}
