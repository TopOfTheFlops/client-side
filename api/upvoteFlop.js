const request = require('superagent')

module.exports = (dispatch, flopId) => {
  var toSend = {
    action: 'upvote',
    flopId: flopId
  }
  request
    .post('https://topoftheflops.herokuapp.com/api/v1/flops/vote')
    .withCredentials()
    .send(toSend)
    .end((err, res) => {
      if (err) return console.log(err)
      if (res.body.error) {
        dispatch({type: 'CHANGE_PAGE', payload: '/unauthenticated'})
      }
      dispatch({type:'UP_VOTE', payload: flopId})
    })
}
