import request from 'superagent'

module.exports = (dispatch) => {
  dispatch({type: 'REQUEST_LIFESTYLES'})
  request
    .get('https://topoftheflops.herokuapp.com/api/v1/lifestyles')
    .end((err, res) => {
      if (err) return console.log(err)
      dispatch({type: 'RECEIVE_LIFESTYLES', payload: res.body.lifestyles})
  })
}
