import request from 'superagent'

module.exports = (dispatch, flopId) => {
  request
    .post('https://topoftheflops.herokuapp.com/api/v1/flops/vote')
    .send({
      action: "downvote",
      flopId: flopId
    })
    .end((err, res) => {
      if (err) return console.log(err)
      console.log(res);
      dispatch({type:'DOWN_VOTE', payload: flopId})
    })
}
