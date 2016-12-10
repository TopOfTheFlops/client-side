import request from 'superagent'

module.exports = (dispatch) => {
  request
    .get('http://topoftheflops.herokuapp.com/api/v1/flops')
    .end((err, res) => {
      if (err) return console.log(err)
      dispatch({type: 'RECEIVE_FLOPS', payload: res.body.flops})
  })
}
