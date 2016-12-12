import request from 'superagent'

module.exports = (dispatch, userInfo) => {
  request
    .post('https://topoftheflops.herokuapp.com/api/v1/users/signup')
    .send(userInfo)
    .end((err, res) => {
      if (err) return console.log(err)
      console.log(res.body);
      dispatch({type: 'CHANGE_PAGE', payload: '/'})
      dispatch({type: 'REMOVE_PHOTO_URL'})
    })
}
