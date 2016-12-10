import request from 'superagent'

module.exports = (dispatch, userInfo) => {
  console.log(userInfo);
  request
    .post('https://topoftheflops.herokuapp.com/api/v1/users/signup')
    .send(userInfo)
    .end((err, res) => {
      if (err) return console.log(err)
      dispatch({type: 'CHANGE_PAGE', payload: '/'})
    })
}