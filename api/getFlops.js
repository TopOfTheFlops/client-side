import request from 'superagent'

module.exports = (dispatch) => {
  dispatch({type: 'REQUEST_FLOPS'})
  request
    .get('https://topoftheflops.herokuapp.com/api/v1/flops')
    .end((err, res) => {
      if (err) return console.log(err)
      dispatch({type: 'RECEIVE_FLOPS', payload: res.body.flops})
  })
}
