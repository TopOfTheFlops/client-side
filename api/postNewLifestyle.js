import request from 'superagent'
import getLifestyles from '../api/getLifestyles'

module.exports = (dispatch, lifestyleInfo) => {
  console.log(lifestyleInfo);
  request
    .post('https://topoftheflops.herokuapp.com/api/v1/lifestyles')
    .withCredentials()
    .send(lifestyleInfo)
    .end((err, res) => {
      if (err) return console.log(err)
      if (res.body.error) {
        dispatch({type: 'CHANGE_PAGE', payload: '/unauthenticated'})
      }
      else {
        getLifestyles(dispatch)
        dispatch({type: 'CHANGE_PAGE', payload: '/dashboard'})
        dispatch({type: 'REMOVE_PHOTO_URL'})
    }
    })
}
