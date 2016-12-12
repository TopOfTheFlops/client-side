import request from 'superagent'
import url from './apiUrl'

module.exports = (dispatch, flopId) => {
  request
    .post(`${url}/api/v1/flops/vote`)
    .withCredentials()
    .send({
      action: "downvote",
      flopId: flopId
    })
    .end((err, res) => {
      if (err) return console.log(err)
      if (res.body.error) {
        dispatch({type: 'CHANGE_PAGE', payload: '/unauthenticated'})
      }
      console.log(res);
      dispatch({type:'DOWN_VOTE', payload: flopId})
    })
}
