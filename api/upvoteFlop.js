const request = require('superagent')

module.exports = (dispatch, flopId) => {
  var toSend = {
    action: 'upvote',
    flopId: flopId
  }
  console.log('Tosend', toSend)
  request
    .post('https://topoftheflops.herokuapp.com/api/v1/flops/vote')
    .withCredentials()
    .send(toSend)
    .end((err, res) => {
      if (err) return console.log(err)
      console.log('Response from upvote', res)
      dispatch({type:'UP_VOTE', payload: flopId})
    })
}
