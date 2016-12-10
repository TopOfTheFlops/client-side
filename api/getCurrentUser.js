import request from 'superagent'

module.exports = (dispatch, userId) => {
  request
    .get(`http://topoftheflops.herokuapp.com/api/v1/users/${userId}`)
    .end((err, res) =>{
      if (err) return console.log(err)
      dispatch({type: 'RECEIVE_CURRENT_USER', payload: res.body.user})
    })
}
