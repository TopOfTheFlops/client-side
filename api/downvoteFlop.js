import request from 'superagent'

module.exports = (dispatch, flopId) => {
  dispatch({type:'DOWN_VOTE', payload: flopId})
  request
    .post('http://topoftheflops.herokuapp.com/api/v1/flops/vote')
    .send({
      action: "downvote",
      flopId: flopId
    })
    .end((err, res) => {
      if (err) return console.log(err)
    })
}