import request from 'superagent'
import getLifestyles from '../api/getLifestyles'

module.exports = (dispatch, lifestyleInfo) => {
  console.log(lifestyleInfo);
  request
    .post('https://topoftheflops.herokuapp.com/api/v1/lifestyles')
    .withCredentials()
    .send(lifestyleInfo)
    .end((err, res) => {
      if (err) {
        console.log('hello', err)
        dispatch({type: 'CHANGE_PAGE', payload: '/unauthenticated'})
      }
      // console.log('hello', res.body);
      else {
        getLifestyles(dispatch)
        dispatch({type: 'CHANGE_PAGE', payload: '/dashboard'})
        dispatch({type: 'REMOVE_PHOTO_URL'})
    }
    })
}
