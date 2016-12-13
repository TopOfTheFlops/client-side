import request from 'superagent'
import getFlops from '../api/getFlops'
import url from './apiUrl'

module.exports = (dispatch, flopInfo) => {
  console.log(flopInfo);
  request
    .post(`${url}/api/v1/flops`)
    .send(flopInfo)
    .withCredentials()
    .end((err, res) => {
      if (err) return console.log(err)
      if (res.body.error) {
        dispatch({type: 'CHANGE_PAGE', payload: '/unauthenticated'})
      } else {
        getFlops(dispatch)
        dispatch({type: 'CHANGE_PAGE', payload: '/flops'})
        dispatch({type: 'REMOVE_PHOTO_URL'})
      }
    })
}
