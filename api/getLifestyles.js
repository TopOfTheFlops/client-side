import request from 'superagent'
import url from './apiUrl'

module.exports = (dispatch) => {
  dispatch({type: 'REQUEST_LIFESTYLES'})
  request
    .get(`${url}/api/v1/lifestyles`)
    .end((err, res) => {
      if (err) return console.log(err)
      dispatch({type: 'RECEIVE_LIFESTYLES', payload: res.body.lifestyles})
      dispatch({type: 'ATTACH_VOTES'})
  })
}
