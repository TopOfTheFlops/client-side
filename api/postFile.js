import request from 'superagent'
import getFlops from '../api/getFlops'
import url from './apiUrl'

module.exports = (dispatch, mediaFile) => {
  console.log(mediaFile)
  request
    .post(`${url}/api/v1/flops/photo`)
    .withCredentials()
    .type('image/jpg')
    .send(mediaFile)
    .end((err, res) => {
      if (err) return console.log(err)
      if (res.body.error) {
        dispatch({type: 'CHANGE_PAGE', payload: '/unauthenticated'})
      } else {
        getFlops(dispatch)
        dispatch({type: 'CHANGE_PAGE', payload: '/flops'})
      }
    })
}
