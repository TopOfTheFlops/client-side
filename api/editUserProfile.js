import request from 'superagent'

module.exports = (dispatch, userInfo, state) => {
  request
    .post('https://topoftheflops.herokuapp.com/api/v1/users/edit${state.currentUser.userId}')
    .withCredentials()
    .send(userInfo)
    .end((err, res) => {
      if (err) return console.log(err)
      console.log(res.body);
      dispatch({type: 'CHANGE_PAGE', payload: '/profile'})
      dispatch({type: 'REMOVE_PHOTO_URL'})
    })
}
