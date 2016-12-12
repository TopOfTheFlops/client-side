import request from 'superagent'
import getFlops from '../api/getFlops'

module.exports = (dispatch, flopInfo) => {
  request
    .post('https://topoftheflops.herokuapp.com/api/v1/flops')
    .send(flopInfo)
    .withCredentials()
    .end((err, res) => {
      if (err) return console.log(err)
      // console.log(res.body.error);
      if (res.body.error) {
        dispatch({type: 'CHANGE_PAGE', payload: '/unauthenticated'})
      }
      else {
        getFlops(dispatch)
        dispatch({type: 'CHANGE_PAGE', payload: '/flops'})
        dispatch({type: 'REMOVE_PHOTO_URL'})
      }
    })
}
