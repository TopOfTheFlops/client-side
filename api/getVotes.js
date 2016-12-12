import request from 'superagent'
import url from './apiUrl'

module.exports = (dispatch, userId) => {
  request
    .get(`${url}/api/v1/votes`)
    .end((err, res) =>{
      if (err) return console.log(err)
      dispatch({type: 'RECEIVE_VOTES', payload: res.body})
      dispatch({type: 'ATTACH_VOTES'})
    })
}
