import request from 'superagent'

module.exports = (dispatch, flopId) => {
  request
    .post('https://topoftheflops.herokuapp.com/api/v1/flops/vote')
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
