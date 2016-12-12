import request from 'superagent'
import url from './apiUrl'

module.exports = (dispatch, userInfo) => {
  request
    .post(`${url}/api/v1/users/signup`)
    .withCredentials()
    .send(userInfo)
    .end((err, res) => {
      if (err) return console.log(err)
      console.log(res.body)
      dispatch({type: 'CHANGE_PAGE', payload: '/'})
      dispatch({type: 'REMOVE_PHOTO_URL'})
    })
}
