import request from 'superagent'

module.exports = (dispatch) => {
  request
    .get('http://topoftheflops.herokuapp.com/api/v1/lifestyles')
    .end((err, res) => {
      if (err) return console.log(err)
      console.log('Getting lifestlyes', res.body);
      dispatch({type: 'RECEIVE_LIFESTYLES', payload: res.body.lifestyles})
  })
}
