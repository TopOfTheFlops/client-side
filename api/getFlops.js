import request from 'superagent'
import url from './apiUrl'

module.exports = (dispatch) => {
  dispatch({type: 'REQUEST_FLOPS'})
  request
    .get(`${url}/api/v1/flops`)
    .end((err, res) => {
      if (err) return console.log(err)
      dispatch({type: 'RECEIVE_FLOPS', payload: res.body.flops})
      dispatch({type: 'ATTACH_VOTES'})
  })
}
